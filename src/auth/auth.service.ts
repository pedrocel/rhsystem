import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { User } from "src/user/user.entity";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: {username}});

    if(!user || user.password !== password) {
      throw new Error('Usuário ou Senha inválida.');
    }

    const token = this.generatedToken(user.id)

    return {message: 'Acesso bem sucedido', token}
  }

  private generatedToken(userId) {
    const payload = { userId };
    const secretKey = 'apirh';
    const expiresIn = '1h';

    return jwt.sign(payload, secretKey, {expiresIn});
  }
}