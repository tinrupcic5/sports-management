import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Hello World Controller')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello World example' })
  @ApiResponse({
    status: 200,
    description: 'Hello World retrieved successfully',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
