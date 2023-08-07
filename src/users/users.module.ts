import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      schema: UserSchema,
      name: User.name
      
    }
  ])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
