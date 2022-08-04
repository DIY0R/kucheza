import { AuthUseCase } from '../usecase/auth.usecase';

describe('AccountEntity', () => {
  it('entered correctly login', async () => {
    const auth = new AuthUseCase({} as any, {} as any);

    const spy = jest.spyOn(auth as any, 'checkUser');

    spy.mockReturnValue({
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
});
