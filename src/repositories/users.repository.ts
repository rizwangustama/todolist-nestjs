import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  // * All Users
  async findAll(): Promise<any[]> {
    const [rows] = await this.connection.execute(
      'SELECT ID_USER, USERNAME, FULL_NAME, CREATE_AT, UPDATE_AT FROM USERS',
    );
    return rows as any[];
  }

  // * Details Users
  async findById(id: number): Promise<any> {
    console.log(id);
    const [rows] = await this.connection.execute(
      'SELECT ID_USER, USERNAME, FULL_NAME, CREATE_AT, UPDATE_AT FROM USERS WHERE ID_USER = ?', [id]
    );

    console.log(rows);
    return (rows as any[])[0];
  }

  // * Create Users
  async createUsers(createUsers: any) {
    try {
      const {
        username,
        password,
        fullName,
      } = createUsers;

      const [result] = await this.connection.execute(
        'INSERT INTO USERS (USERNAME, PASSWORD, FULL_NAME) VALUES (?, ?, ?)',
        [username, password, fullName],
      );

      const insertId: any = (result as any).insertId;

      const [rows] = await this.connection.execute(
        'SELECT * FROM USERS WHERE ID_USER = ?',
        [insertId]
      );

      return insertId;
    } catch (error) {
      throw new Error(`Failed to Create User: ${error.message}`);
    }
  }

  async deleteUsers(id: any) {
    try {
      await this.connection.execute('DELETE FROM USERS WHERE ID_USER = ?', [id]);
    } catch (error) {
      console.log(error);
    }
  }
}
