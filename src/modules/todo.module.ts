import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { TodoRepository } from "src/repositories/todo.repository";
import { TodoServices } from "src/services/todo.services";
import { TodoController } from "src/controllers/todo.controller";

@Module({
  imports: [DatabaseModule],
  providers: [TodoRepository, TodoServices],
  controllers: [TodoController],
  exports: [TodoServices],
})

export class TodoModule {}