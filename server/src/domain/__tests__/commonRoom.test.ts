import { commonRoomUseCase } from '../usecase/commonRoom.usecase';

describe('commonRoom', () => {
  const write = jest.fn((data: string) => true || false);
  const socketStorage = { 5: { write } };
  const commonRoomGeteway = {
    push: jest.fn((data: string, id: number) => {}),
  };
  const CommonRoomUseCase = new commonRoomUseCase(
    socketStorage as any,
    commonRoomGeteway as any
  );
  test('check the algorithm for sending messages to all', () => {
    const args: [string, number] = ['hello', 5];
    CommonRoomUseCase.generalSendAndSave(...args);
    expect(commonRoomGeteway.push).toHaveBeenCalledWith(...args);
    expect(write).toBeCalledTimes(Object.keys(socketStorage).length);
  });
});
