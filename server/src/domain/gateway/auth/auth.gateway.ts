import { RegistrationEntity, UserEntity } from '../../entities/auth';

export interface AuthGateway {
  findByEmail(email: string): UserEntity;
  addUser(user: RegistrationEntity): UserEntity;
  findAll(): Array<any>;
}
