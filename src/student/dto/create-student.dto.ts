import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto { 
  @IsNotEmpty()
  @IsString()
  name: string; 
  @IsString()
  @IsNotEmpty()
  regNo: string;
  @IsString()
  @IsNotEmpty()
  nin: string;
  @IsString()
  @IsNotEmpty()
  state: string;
  @IsString()
  @IsNotEmpty()
  program: string;
}
