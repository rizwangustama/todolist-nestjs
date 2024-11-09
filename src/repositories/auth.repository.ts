import { Inject, Injectable } from "@nestjs/common";
import { Connection } from "mysql2/promise";

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection
  ) {}

  async auth(username: string, password: string): Promise<any> {
    try {
      // Gunakan prepared statement untuk menghindari SQL Injection
      const [rows] = await this.connection.execute(
        `SELECT * FROM USERS WHERE USERNAME = ? && PASSWORD = ?`,
        [username, password]
      );
      return rows[0];
    } catch (error) {
      throw new Error("Database query failed");
    }
  }
}