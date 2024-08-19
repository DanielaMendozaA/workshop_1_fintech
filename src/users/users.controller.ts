import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUser } from './dto/create-user/create-user';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUser) {
        return this.userService.createUser(createUserDto);
    }

}
