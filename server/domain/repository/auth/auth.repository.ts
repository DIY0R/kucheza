import { RegistrationEntity, UserEntity } from '../../entities/auth';

export interface AuthRepository {
  findByEmail(email: string): UserEntity;
  addUser(user: RegistrationEntity): UserEntity;
  findAll(): Array<any>;
}
