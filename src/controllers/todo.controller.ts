import {Body, Controller, Delete, Get, Param, Post, UseInterceptors, UseGuards, Put} from "@nestjs/common";
import { TodoDto } from 'src/dto/todo.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptors';
import { TodoServices } from 'src/services/todo.services';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

export interface ApiResponse<T> {
  isSuccessfully: boolean;
  payload: T;
}

@Controller('/todolist')
@UseInterceptors(TransformInterceptor)
export class TodoController {
  constructor(private todoServices: TodoServices) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ApiResponse<TodoDto[]>> {
    const result: any = await this.todoServices.findAll();
    return result;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param() id: string) {
    try {
      return this.todoServices.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: TodoDto): Promise<any> {
    try {
      console.log('Controller', body);
      return this.todoServices.createTodo(body);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteTodoList(@Body() body: any): Promise<any> {
    try {
      console.log(body, 'body nih');
      return this.todoServices.deleteTodo(body);
    } catch (error) {
      console.log(error);
    }
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateTodoListController(@Body() body: any) {
    try {
      return this.todoServices.updateTodo(body);
    } catch (err) {
      console.log(err);
    }
  }
}
