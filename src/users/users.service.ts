import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UsersService {
  private users = [{ name: 'manu', id: '1' }]

  findAll() {
    return this.users
  }

  findById(id: string) {
    const user = this.users.find((u) => u.id == id)

    if (!user) {
      throw new NotFoundException('User not foud')!
    }
    return user
  }

  createUser(userDto: any) {
    return userDto
  }
}
