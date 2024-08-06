import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PageService } from './page.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPageDto: CreatePageDto, @Request() req): Promise<any> {
    const userId = req.user.id;
    return this.pageService.create(createPageDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.pageService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(+id, updatePageDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
