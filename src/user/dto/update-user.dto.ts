import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Column } from 'typeorm';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    avatar?: string;
    @Column()
    role_id: number;
}
