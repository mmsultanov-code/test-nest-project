import { Column } from "typeorm";

export class LoginAuthDTO {
    @Column()
    email: string;
    @Column()
    password: string;
}
