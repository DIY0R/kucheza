import { CommonRoomGetewayInterface } from '../../domain/gateway/room/commonRoom.geteway';
import { CommonRoomGeteway } from '../CommonRoomGeteway';

describe('check Common Room Geteway', () => {
  const commonRoomGeteway: CommonRoomGetewayInterface = new CommonRoomGeteway();
  test('push data', () => {
    commonRoomGeteway.push('hello', 7);
    expect((commonRoomGeteway as any).chatHisotry[7]).toBe('hello');
  });
});
