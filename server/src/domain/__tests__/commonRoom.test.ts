import { commonRoomUseCase } from '../usecase/commonRoom.usecase';

describe('commonRoom', () => {
  const write = jest.fn((data: string) => true || false);
  const socketStorage: { [key: string]: { write: Function } } = {
    5: { write },
  };
  const commonRoomGeteway = {
    push: jest.fn((data: string, id: number) => {}),
  };
  const CommonRoomUseCase = new commonRoomUseCase(
    socketStorage as any,
    commonRoomGeteway as any
  );
  const args: [string, number] = ['hello', 5];
  afterEach(() => {
    write.mockClear();
  });
  test('check the algorithm for sending messages to all', () => {
    CommonRoomUseCase.generalSendAndSave(...args);
    expect(commonRoomGeteway.push).toHaveBeenCalledWith(...args);
    expect(write).toBeCalledTimes(Object.keys(socketStorage).length);
  });

  test('check the sending algorithm to one person', () => {
    CommonRoomUseCase.sendOne(...args);
    expect(socketStorage[args[1]].write).toBeCalledTimes(1);
  });
});
