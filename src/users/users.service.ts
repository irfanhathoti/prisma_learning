import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException();
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      new BadRequestException('User not found', {
        description: `User not found`,
      });
    }
    return user;
  }
}
