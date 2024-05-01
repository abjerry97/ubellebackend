import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { states } from '../common/states';
import { courses } from '../common/courses';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("states")
  getStates(): string[] {
    return states;
  }
  @Get("courses")
  getCourses(): string[] {
    return courses;
  }
}
