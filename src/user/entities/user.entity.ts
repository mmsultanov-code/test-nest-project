import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Role } from "src/role/entities/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password?: string;

    @Column()
    avatar: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: "role_id" })
    role: Role;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "creator_id" })
    creator: User;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "updated_by" })
    updater: User;
}