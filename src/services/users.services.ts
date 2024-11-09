import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { ResponseBuilder } from 'src/utils/response.builder';
@Injectable()
export class UsersServices {
  constructor(private usersRepository: UsersRepository) {}

  async findAll(): Promise<any[]> {
    return this.usersRepository.findAll()
  }

  async createUsers(createUsersDto: any) {
    if (!createUsersDto.username) {
      throw new BadRequestException('UserName tidak Boleh Kosong')
    }

    if (!createUsersDto.password) {
      throw new BadRequestException('Password tidak Boleh Kosong')
    }

    const insertId: any = await this.usersRepository.createUsers(createUsersDto);
    const newUsers: any = await this.usersRepository.findById(insertId);

    if (!newUsers) {
      throw new BadRequestException('Gagal Membuat Users');
    }
    return newUsers;
  }

  async getFindById(paramsValue: any) {
    const getId = parseInt(paramsValue.id);
    const detailUsers = await this.usersRepository.findById(getId);
    return ResponseBuilder.success(detailUsers);
  }

  async deleteUsers(deleteUserDto: any) {
    const { id } = deleteUserDto;
    if (!id) {
      throw new BadRequestException('userId tidak Boleh Kosong');
    }
    // Attempt to find the user first
    const userToDelete = await this.usersRepository.findById(id);

    if (!userToDelete) {
      throw new NotFoundException('Users Tidak ada');
    }

    // Delete the user
    await this.usersRepository.deleteUsers(id);

    // Optionally return something if needed
   return userToDelete;
  }
}
