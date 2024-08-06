import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findByEmail(email);
		if (user && password && await bcrypt.compare(password, user.password)) {
			const { password, ...result } = user;
			return result;
		}
		throw new UnauthorizedException('Invalid credentials');
	}

	async login(user: User) {
		const payload = { username: user.name, sub: user.id };
		const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
		const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
		return {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}

	async refreshToken(refreshToken: string): Promise<any> {
		try {
			const payload = this.jwtService.verify(refreshToken);
			const user = await this.userService.findOne(payload.sub);
			if (!user) {
				throw new UnauthorizedException('Invalid refresh token');
			}
			const newAccessToken = this.jwtService.sign({ username: user.name, sub: user.id }, { expiresIn: '15m' });
			return { access_token: newAccessToken };
		} catch (error) {
			throw new UnauthorizedException('Invalid refresh token');
		}
	}
}