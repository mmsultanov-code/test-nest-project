import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	private readonly saltRounds = 10;

	constructor(
		@InjectRepository(User)
		private readonly repository: Repository<User>,
	) { }

	async create(createUserDto: CreateUserDto): Promise<User> {
		try {
			const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRounds);
			const user = this.repository.create({
				...createUserDto,
				password: hashedPassword,
			});
			return await this.repository.save(user);
		} catch (error) {
			console.error('Error creating user:', error);
			throw new InternalServerErrorException('Failed to create user');
		}
	}

	async findAll(): Promise<User[]> {
		try {
			const users = await this.repository.find();
			return users.map(user => {
				const { password, ...userWithoutPassword } = user;
				return userWithoutPassword;
			});
		} catch (error) {
			console.error('Error retrieving users:', error);
			throw new InternalServerErrorException('Failed to retrieve users');
		}
	}

	async findOne(id: number): Promise<User> {
		try {
			const user = await this.repository.findOneBy({ id });
			if (!user) {
				throw new NotFoundException('User not found');
			}
			const { password, ...userWithoutPassword } = user;
			return userWithoutPassword;
		} catch (error) {
			console.error('Error retrieving user:', error);
			throw new NotFoundException('User not found')
		}
	}

	async findByEmail(email: string): Promise<User> {
		try {
			const user = await this.repository.findOneBy({ email });
			if (!user) {
				throw new NotFoundException('User not found');
			}
			return user;
		} catch (error) {
			console.error('Error retrieving user:', error);
			throw new NotFoundException('User not found')
		}
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		try {
			if (updateUserDto.password) {
				updateUserDto.password = await bcrypt.hash(updateUserDto.password, this.saltRounds);
			}

			await this.repository.update(id, updateUserDto);
			return this.findOne(id);
		} catch (error) {
			console.error('Error updating user:', error);
			throw new InternalServerErrorException('Failed to update user');
		}
	}

	async remove(id: number): Promise<void> {
		try {
			const result = await this.repository.delete(id);
			if (result.affected === 0) {
				throw new NotFoundException('User not found')
			}
		} catch (error) {
			console.error('Error removing user:', error);
			throw new NotFoundException('User not found')
		}
	}
}