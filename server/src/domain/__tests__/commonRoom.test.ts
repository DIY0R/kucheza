import { SendOne } from '../entities/room/sendOne';
import { commonRoomUseCase } from '../usecase/commonRoom.usecase';

describe('commonRoom', () => {
  const writeAll = jest.fn((data: string) => true || false);
  const write = jest.fn((data: string) => true || false);
  const socketStorage = {
    write,
    writeAll,
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
    writeAll.mockClear();
  });
  test('check the algorithm for sending messages to all', () => {
    CommonRoomUseCase.generalSendAndSave(...args);
    expect(commonRoomGeteway.push).toHaveBeenCalledWith(...args);
    expect(writeAll).toBeCalledTimes(1);
  });

  test('check the sending algorithm to one person', () => {
    const sendObj: SendOne = { data: 'hi', id: 5, senderName: 'Bingo' };
    CommonRoomUseCase.sendOne(sendObj);
    expect(write).toBeCalledTimes(1);
  });
  test('check the algorithm for sending conecttion info', () => {
    const inf = ['Bingo', '24'];
    CommonRoomUseCase.generalSendConecttion(inf, 5);
    expect(writeAll).toBeCalledTimes(1);
  });
});
