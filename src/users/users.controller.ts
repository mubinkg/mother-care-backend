import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {Express ,Request} from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { FileReaderFactory } from './file-reader-factory/reader.factory';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileReaderFactory:FileReaderFactory
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File
  ) {
    const data = await this.fileReaderFactory.create(file);
    return this.usersService.create(data[0]);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('searchUser')
  searchUser(@Req() req: Request) {
    return this.usersService.searchUser(req.body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
