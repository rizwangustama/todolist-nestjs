import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, UseInterceptors, UseGuards, Param } from "@nestjs/common";
import { TransformInterceptor } from 'src/interceptors/transform.interceptors';
import { UsersServices } from '../services/users.services';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';
import { ResponseBuilder } from '../utils/response.builder';

@Controller('/users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private userServices: UsersServices) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const items: any = await this.userServices.findAll();
    return ResponseBuilder.success(items);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getFindById(@Param() id: string) {
    const result = await this.userServices.getFindById(id);
    return result;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: any): Promise<any> {
    try {
      const newUser = await this.userServices.createUsers(body);
      return ResponseBuilder.success(newUser, 'Users Create Successfully');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to retrieve item');
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async delete(@Body() body: any): Promise<any> {
    try {
      const result = await this.userServices.deleteUsers(body);
      console.log(result);
      return ResponseBuilder.success(result); // Assuming ResponseBuilder is used to format the response
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete user hah');
    }
  }
}
