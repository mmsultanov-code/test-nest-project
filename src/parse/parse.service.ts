import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ParseService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create_permissions() {
    const permissions = [
      { name: 'Super Admin Index', slug: 'super_admin_index' },
      { name: 'Super Admin Create', slug: 'super_admin_create' },
      { name: 'Super Admin Read', slug: 'super_admin_read' },
      { name: 'Super Admin Update', slug: 'super_admin_update' },
      { name: 'Super Admin Delete', slug: 'super_admin_delete' },
      { name: 'Super Admin Trash', slug: 'super_admin_trash' },
      { name: 'Super Admin All', slug: 'super_admin_all' },
    ];

    return await this.permissionRepository.save(permissions);
  }

  async create_roles() {
    const roles = [
      {
        name: 'User',
        slug: 'user_role',
        creator_id: 1,
        permissions: [],
      },
      {
        name: 'Admin',
        slug: 'admin_role',
        creator_id: 1,
        permissions: [],
      },
    ];

    return await this.roleRepository.save(roles);
  }

  async create_users() {
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'stringst',
      avatar: '',
      role: { id: 1 }
    };

    return await this.userRepository.save(user);
  }
}