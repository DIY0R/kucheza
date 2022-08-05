import { ErrorGenerator } from '../abstracts';
import { UserEntity } from '../entities/auth';
import { AuthGatewayInterface } from '../gateway/auth/auth.gateway';
import { AuthUseCase } from '../usecase/auth.usecase';

describe('AccountEntity', () => {
  const errorGenerator: ErrorGenerator = { message: 'Erorr', status: 403 };
  const addUser = jest
    .fn()
    .mockReturnValue({ name: 'Kola', email: 'kola@hi.com' });
  const auth = new AuthUseCase({ addUser } as any, errorGenerator);

  const checkUser = jest.spyOn(auth as any, 'checkUser');
  afterEach(() => {
    checkUser.mockClear();
    addUser.mockClear();
  });

  test('entered correctly login', async () => {
    checkUser.mockReturnValue({
      name: 'Kola',
      email: 'kola@hi.com',
      password: '123',
    } as any);

    const user = await auth.login({ password: '123' } as any);

    expect((auth as any).checkUser).toBeCalledTimes(1);
    expect(user).toEqual({
      name: 'Kola',
      email: 'kola@hi.com',
      password: '123',
    });
  });

  test('incorrect data entry login', async () => {
    checkUser.mockReturnValue({
      name: 'Kola',
      email: 'kola@hi.com',
      password: '1253',
    } as any);

    const user = await auth.login({ password: '123' } as any);

    expect((auth as any).checkUser).toBeCalledTimes(1);
    expect(user).toEqual(errorGenerator);
  });

  test('the correct data has been saved during the registration process', async () => {
    checkUser.mockReturnValue(null);

    const user = await auth.registration({
      name: 'Kola',
      email: 'kola@hi.com',
    } as any);
    expect((auth as any).checkUser).toBeCalledTimes(1);
    expect(addUser).toBeCalledTimes(1);
    expect(user).toEqual({ name: 'Kola', email: 'kola@hi.com' });
  });

  test('were maintained by existing data', async () => {
    checkUser.mockReturnValue({
      name: 'Kola',
      email: 'kola@hi.com',
    });

    const user = await auth.registration({
      name: 'Kola',
      email: 'kola@hi.com',
    } as any);
    expect((auth as any).checkUser).toBeCalledTimes(1);
    expect(addUser).toBeCalledTimes(0);
    expect(user).toEqual(errorGenerator);
  });
});
