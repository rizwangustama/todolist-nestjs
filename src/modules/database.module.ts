import { Module } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Pool> => {
        const connection: Pool = await createPool({
          host: 'localhost',
          user: 'rizwangustama',
          password: 'B1smilah',
          database: 'TODO_LIST',
        });
        return connection;
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
