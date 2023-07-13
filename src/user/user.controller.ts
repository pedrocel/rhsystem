import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('list/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Post('create')
  async createUser(@Body() newUser: User) {
    return this.userService.createUser(newUser);
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: number, @Body() updatedUser: Partial<User>) {
    return this.userService.updateUser(id, updatedUser);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}