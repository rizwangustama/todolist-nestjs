import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { TodoDto } from 'src/dto/todo.dto';

@Injectable()
export class TodoRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  async findAll(): Promise<TodoDto[]> {
    const [data] = await this.connection.execute(
      'SELECT ID, ID_USER, ACTIVITY_NO, SUBJECT, DESCRIPTION, STATUS FROM TODO_LIST',
    );
    return data as TodoDto[];
  }

  async findById(id: number) {
    try {
      const [data] = await this.connection.execute(
        'SELECT ID, ID_USER, ACTIVITY_NO, SUBJECT, DESCRIPTION, STATUS FROM TODO_LIST WHERE ID = ?',
        [id],
      );
      return (data as any[])[0];
    } catch (error) {
      console.log(error);
    }
  }

  async createTodo(body, actNumber: string) {
    try {
      const { subject, description, status } = body;
      const [data] = await this.connection.execute(
        'INSERT INTO TODO_LIST (ID_USER, ACTIVITY_NO, SUBJECT, DESCRIPTION, STATUS) VALUES (?, ?, ?, ?, ?)',
        [1, actNumber, subject, description, status],
      );
      const createId: any = (data as any).insertId;
      return createId;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(body: any) {
    try {
      console.log(body);
      const { id, subject, description, status } = body;
      const [data] = await this.connection.execute(
        'UPDATE TODO_LIST SET SUBJECT = ?, DESCRIPTION = ?, STATUS = ? WHERE ID = ?',
        [subject, description, status, id],
      );
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteTodo(id: number): Promise<any> {
    try {
      const [data] = await this.connection.execute(
        'DELETE FROM TODO_LIST WHERE ID = ?',
        [id],
      );
      return (data as any).affectedRows;
    } catch (error) {
      console.log(error);
    }
  }
}
