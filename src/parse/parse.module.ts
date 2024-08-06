import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParseService } from './parse.service';
import { ParseController } from './parse.controller';
import { Permission } from '../permissions/entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role, User])],
  controllers: [ParseController],
  providers: [ParseService],
})
export class ParseModule {}