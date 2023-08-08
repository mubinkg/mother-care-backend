import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel:Model<UserDocument>
  ){}

  async create(createUserDto: CreateUserDto) {
    await this.userModel.create({userDetails: createUserDto});
    const userList = await this.userModel.find({}).limit(10).sort('-_id');
    return this.processData(userList);
  }

  async findAll() {
    const userList = await this.userModel.find({}).limit(10).sort('-_id');
    return this.processData(userList);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return ""
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    const userList = await this.userModel.find({}).limit(10).sort('-_id');
    return this.processData(userList);
  }

  processData(userList:User[]){
    const headers = new Set();
    const users = [];
    userList.forEach(user=>{
      const keys = Object.keys(user.userDetails);
      users.push({...user.userDetails, id: user._id});
      keys.forEach(key=>{
        headers.add(key);
      })
    })
    const listHeaders = Array.from(headers);
    const response = {
      headers : listHeaders,
      users: users
    }
    return response;
  }
}
