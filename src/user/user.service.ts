import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }
}
