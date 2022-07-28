import { RegistrationEntity, UserEntity } from '../../entities/auth';

export interface AuthGatewayInterface {
  findByEmail(email: string): UserEntity;
  addUser(user: RegistrationEntity): UserEntity;
  findAll(): Array<any>;
}
