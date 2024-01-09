import { Body, Controller, Get, HttpCode, Logger, Param, Patch, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dtos/createUserDto'

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name)

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
    this.logger.log('Creando usuario en controlador')
    const user = await this.userService.createUser(createUserDto)
    this.logger.log('Finalized User in controller')

    return user
  }

  @Patch()
  async updateUser(@Body() updateUserDto: any, @Param('id') id: string) {}
}
