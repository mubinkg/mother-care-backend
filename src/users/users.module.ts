import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { FileReaderFactory } from './file-reader-factory/reader.factory';

@Module({
  imports: [MongooseModule.forFeature([
    {
      schema: UserSchema,
      name: User.name
    }
  ])],
  controllers: [UsersController],
  providers: [UsersService, FileReaderFactory]
})
export class UsersModule {}
