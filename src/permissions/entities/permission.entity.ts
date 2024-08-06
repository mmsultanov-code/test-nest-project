import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Role } from "src/role/entities/role.entity";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}