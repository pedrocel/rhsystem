import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "./address.entity";
import { Repository } from "typeorm";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) {}

  async getAllAddress() {
    return await this.addressRepository.find();
  }

  async getAddress(id: number) {
    return await this.addressRepository.findOneBy({ id: id});
  }

  
}