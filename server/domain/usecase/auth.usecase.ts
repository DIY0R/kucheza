import { ErrorGenerator } from '../abstracts';
import { LoginEntity, RegistrationEntity, UserEntity } from '../entities/auth';
import { AuthRepository } from '../repository/auth/auth.repository';

export class AuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly errorGenerator: ErrorGenerator
  ) {}

  private async checkUser(email: string): Promise<UserEntity | null> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) return null;
    return user;
  }

  public async login(
    loginInfo: LoginEntity
  ): Promise<ErrorGenerator | UserEntity> {
    const user = await this.checkUser(loginInfo.email);
    if (loginInfo.password !== user?.password) return this.errorGenerator;
    return user;
  }
  public async registration(
    user: RegistrationEntity
  ): Promise<UserEntity | ErrorGenerator> {
    const candidate = await this.checkUser(user.email);
    if (candidate) return this.errorGenerator;
    const newUser = await this.authRepository.addUser(user);
    return newUser;
  }
}
