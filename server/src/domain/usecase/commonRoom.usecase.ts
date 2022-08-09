import { CommonRoomGetewayInterface } from '../gateway/room/commonRoom.geteway';
import { SocketStorage } from '../gateway/room/socketStorage';

export class commonRoomUseCase<S> {
  constructor(
    private socketStorage: SocketStorage,
    private commonRoomGeteway: CommonRoomGetewayInterface
  ) {}

  public generalSendAndSave(data: string, id: number) {
    this.commonRoomGeteway.push(data.toString(), id);
    this.socketStorage.writeAll(data);
  }
  public sendOne(data: string, id: number) {
    this.socketStorage.write(id, data);
  }

  public receiveCommonRoomGeteway(): CommonRoomGetewayInterface {
    return this.commonRoomGeteway;
  }
}
