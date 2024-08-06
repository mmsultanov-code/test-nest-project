import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { AuthModule } from './auth/auth.module';
import { ParseModule } from './parse/parse.module';
import { PageModule } from './page/page.module';
import { Page } from './page/entities/page.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5433,
			username: 'postgres',
			password: 'root',
			database: 'testnest',
			entities: [User, Role, Permission, Page],
			synchronize: true,
		}),
		UserModule,
		RoleModule,
		PermissionsModule,
		ParseModule,
		PageModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
