import { ErrorGenerator } from '../abstracts';
import { AuthUseCase } from '../usecase/auth.usecase';

describe('AccountEntity', () => {
  const errorGenerator: ErrorGenerator = { message: 'Erorr', status: 403 };
  const auth = new AuthUseCase({} as any, errorGenerator);

  const checkUser = jest.spyOn(auth as any, 'checkUser');
  afterEach(() => checkUser.mockClear());

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
});
