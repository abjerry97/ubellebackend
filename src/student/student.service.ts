import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from '../database/database.service';
import { OkResponse } from './utils/helpers';

@Injectable()
export class StudentService {
  constructor(private prisma: DatabaseService) {}
  async create(createStudentDto: CreateStudentDto, image: Express.Multer.File) {
    let newStudent = await this.prisma.student.create({
      data: createStudentDto,
      select: StudentService.studentSelectField(),
    });
    if (image) {
      const fs = require('fs');
      const filename = `uploads/students/${image.originalname.split('.')[0] + Date.now()}.png`;
      fs.writeFile(filename, image.buffer, (err) => {
        if (err) console.log(err);
        else {
          console.log('File written successfully\n');
          console.log('The written has the following contents:');
        }
      });
      newStudent = await this.prisma.student.update({
        where: { id: newStudent.id },
        data: { image: filename },
        select: StudentService.studentSelectField(),
      });
    }
    return OkResponse('Student Created Successfully',HttpStatus.ACCEPTED, newStudent);
  }
  async uploadCertificate(
    id: string,
    name: string,
    image: Express.Multer.File,
  ) {
    let existingStudent = await this.prisma.student.findUnique({
      where: { id },
      select: StudentService.studentSelectField(),
    });

    if (!existingStudent) {
      throw new HttpException(
        {
          message: 'Student not found',
          error: 'Unable to get Student',
          errors: [`Student not found`, 'ERR_NOT_FOUND'],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (image) {
      const fs = require('fs');

      const filename = `uploads/students/${image.originalname.split('.')[0] + Date.now()}.png`;
      fs.writeFile(filename, image.buffer, (err) => {
        if (err) console.log(err);
        else {
          console.log('File written successfully\n');
          console.log('The written has the following contents:');
        }
      });
      const newCertificate =await this.prisma.certification.create({
        data: { link: filename, studentId: existingStudent.id, name },
      });
      
      
      return OkResponse('Upload Certificate Successful',HttpStatus.ACCEPTED, {certificate:newCertificate});
 
    }
    else {
      throw new HttpException(
        {
          message: 'Certificate not uploaded',
          error: 'Unable to to upload certificate',
          errors: [`Certificate not uploaded`, 'ERR_BAD_REQUEST'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    }

  static studentSelectField() {
    return {
      id: true,
      name: true,
      nin: true,
      image: true,
      regNo:true,
      state: true,
      status: true,
      program: true,
      Certification: {
        select: {
          name: true,
          link: true,
          createdAt: true,
        },
      },
    };
  }

  async findAll(
    pageSize: number = 25,
    page: number = 0,search) {

      const query:any ={
        
      }
      if(search){
        query.name= {
          contains: `${search}`,
          mode: 'insensitive',
        }
      }
    const students = await this.prisma.student.findMany({
      where:query,
      select: StudentService.studentSelectField(),
      take: pageSize,
      skip: page * pageSize,
    });
    return OkResponse('All Student Gotten Successfully',HttpStatus.ACCEPTED, students);
  }

  async findOne(id: string) {
    let existingStudent = await this.prisma.student.findUnique({
      where: { id },
      select: StudentService.studentSelectField(),
    });

    if (!existingStudent) {
      throw new HttpException(
        {
          message: 'Student not found',
          error: 'Unable to get Student',
          errors: [`Student not found`, 'ERR_NOT_FOUND'],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return OkResponse(' Student Gotten Successfully',HttpStatus.ACCEPTED, existingStudent);
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
