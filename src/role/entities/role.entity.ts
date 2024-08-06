import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Permission } from "src/permissions/entities/permission.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "creator_id" })
    creator: User;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "updated_by" })
    updater: User;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "role_permissions",
        joinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "permission_id",
            referencedColumnName: "id"
        }
    })
    permissions: Permission[];

    @OneToMany(() => User, user => user.role)
    users: User[];
}