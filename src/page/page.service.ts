import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
	constructor(
		@InjectRepository(Page)
		private readonly repository: Repository<Page>,
	) { }

	async create(createPageDto: CreatePageDto, id: number): Promise<Page> {
		try {
			const page = this.repository.create({
				...createPageDto,
				creator_id: id,
			});
			return await this.repository.save(page);
		} catch (err) {
			console.error('Error creating page:', err);
			throw new Error('Error creating page');
		}
	}

	async findAll() {
		try {
			const response = await this.repository.find()
			return response
		} catch (err) {
			console.error('Error fetching all pages:', err);
			throw new Error('Error fetching all pages');
		}
	}

	async findOne(id: number): Promise<Page> {
		try {
			const page = await this.repository.findOneBy({ id });
			if (!page) {
				throw new NotFoundException(`Page with ID ${id} not found`);
			}
			return page;
		} catch (err) {
			console.error(`Error fetching page with ID ${id}:`, err);
			throw new Error(`Error fetching page with ID ${id}`);
		}
	}

	async update(id: number, updatePageDto: UpdatePageDto): Promise<Page> {
		try {
			const page = await this.repository.preload({
				id,
				...updatePageDto,
			});
			if (!page) {
				throw new NotFoundException(`Page with ID ${id} not found`);
			}
			return await this.repository.save(page);
		} catch (err) {
			console.error(`Error updating page with ID ${id}:`, err);
			throw new Error(`Error updating page with ID ${id}`);
		}
	}

	async remove(id: number): Promise<void> {
		try {
			const result = await this.repository.delete(id);
			if (result.affected === 0) {
				throw new NotFoundException(`Page with ID ${id} not found`);
			}
		} catch (err) {
			console.error(`Error removing page with ID ${id}:`, err);
			throw new Error(`Error removing page with ID ${id}`);
		}
	}
}
