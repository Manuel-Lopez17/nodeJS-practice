import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/createUserDto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  @HttpCode(200)
  async findByid(@Param('id') id: string) {
    return await this.userService.findById(id)
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto)
  }

  @Patch()
  async updateUser(@Body() updateUserDto: any, @Param('id') id: string) {}
}
