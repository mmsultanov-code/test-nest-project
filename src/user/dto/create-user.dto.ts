import { Column } from "typeorm"

export class CreateUserDto {
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
