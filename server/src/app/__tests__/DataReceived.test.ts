import commonRoomUseCase from '../../domain/usecase/commonRoom.usecase';
import DataReceived from '../ResponseReceived/DataReceived';
jest.mock<typeof commonRoomUseCase>(
  '../../domain/usecase/commonRoom.usecase',
  () =>
    jest.fn().mockImplementation(() => ({
      generalSendAndSave: jest.fn(),
    }))
);

describe('DataReceived', () => {
  const CommonRoomUseCase = new commonRoomUseCase<any>({} as any, {} as any);

  const dataReceived = new DataReceived(CommonRoomUseCase);

  test('all', () => {
    const res = {};
    const id = 1;
    dataReceived.all(res, id);
    expect(CommonRoomUseCase.generalSendAndSave).toHaveBeenCalledWith(
      JSON.stringify(res),
      id
      // 55
    );
  });
  test('one', () => {});
  test('connect', () => {});
});
