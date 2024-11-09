import { Injectable } from "@nestjs/common";
import { TodoDto } from "src/dto/todo.dto";
import { TodoRepository } from "src/repositories/todo.repository";
import { ResponseBuilder } from "src/utils/response.builder";


export interface ApiResponse<T> {
  isSuccessfully: boolean;
  payload: T;
}

@Injectable()
export class TodoServices {
  constructor(private todoRepository : TodoRepository) {}
  async findAll(): Promise<ApiResponse<TodoDto[]>> {
    const data: TodoDto[] =  await this.todoRepository.findAll();
    return ResponseBuilder.success(data);
  }

  async findById(value: any) {
    const getParamsId: number = parseInt(value.id)
    const data = await this.todoRepository.findById(getParamsId);
    return ResponseBuilder.success(data);
  }

  async createTodo(body: any) {
    const activityRandom = Math.floor(Math.random()* 1000);
    const formatNumber = String(activityRandom).padStart(3, '0');
    const activityNumber = `ACT${formatNumber}`;
    const getDataId = await this.todoRepository.createTodo(body, activityNumber);
    const newDataTodo = await this.todoRepository.findById(getDataId);
    return ResponseBuilder.success(newDataTodo);
  }

  async deleteTodo(body: any) {
    const getId = parseInt(body.id);
    const payloadDelete = await this.todoRepository.findById(getId);
    const countDelete: number = await this.todoRepository.deleteTodo(getId);
    console.log(countDelete);
    if (countDelete === 0) {
      return ResponseBuilder.error('Data Tidak Berhasil Di Delete');
    } else {
      return ResponseBuilder.success(payloadDelete, 'Data Telah Dihapus');
    }
  }
}