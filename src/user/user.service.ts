import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUser(id: number) {
    return await this.userRepository.findOneBy({ id: id});
  }

  async createUser(newUser: User) {
    const existingUser = await this.userRepository.findOne({
      where: [{ username: newUser.username }, { email: newUser.email }],
    });

    if (existingUser) {
      throw new Error("Usuário já existe.");
    }

    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, updatedUser: Partial<User>) {
    const user = await this.userRepository.findOne({ where: {id}});
  
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
  
    const mergedUser = { ...user, ...updatedUser };
    return await this.userRepository.save(mergedUser);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: {id}});

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return await this.userRepository.delete(user);
  }
}