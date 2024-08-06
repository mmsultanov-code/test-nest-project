import { Controller, Post } from '@nestjs/common';
import { ParseService } from './parse.service';

@Controller('parse')
export class ParseController {
  constructor(private readonly parseService: ParseService) {}

  @Post('/permissions')
  async create_permissions() {
    return this.parseService.create_permissions();
  }

  @Post('/roles')
  async create_roles() {
    return this.parseService.create_roles();
  }

  @Post('/users')
  async create_users() {
    return this.parseService.create_users();
  }
}