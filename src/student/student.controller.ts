import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createStudentDto: CreateStudentDto,
    
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/*' })
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file:Express.Multer.File,
  ) {
    return this.studentService.create(createStudentDto, file);
  }
  @Post(':id/certification')
  @UseInterceptors(FileInterceptor('cert'))
  uploadCertificate(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') studentId: string,
    @Body('name') name: string,
  ) {
    return this.studentService.uploadCertificate(studentId,name, file);
  }

  @Get()
  findAll(@Query('perPage') perPage?: string,@Query('page') page?: string,@Query('search') search?: string) {
    return this.studentService.findAll(+perPage,+page,search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
