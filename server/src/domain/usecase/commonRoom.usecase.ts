import { SendOne } from '../entities/room/sendOne';
import { CommonRoomGetewayInterface } from '../gateway/room/commonRoom.geteway';
import { SocketStorage } from '../gateway/room/socketStorage';

export default class commonRoomUseCase<S> {
  constructor(
    private socketStorage: SocketStorage,
    private commonRoomGeteway: CommonRoomGetewayInterface
  ) {}

  public generalSendAndSave(data: string, id: number) {
    this.commonRoomGeteway.push(data.toString(), id);
    this.socketStorage.writeAll(JSON.stringify({ summon: 'all', id, data }));
  }
  public generalSendConecttion(info: Array<string>, id: number) {
    const [name, age] = info;
    this.socketStorage.writeAll(
      JSON.stringify({ summon: 'info', id, name, age })
    );
  }
  public sendOne(sendOne: SendOne) {
    const { id, data, senderName } = sendOne;
    const sendOneParse = JSON.stringify({ summon: 'one', data, senderName });
    this.socketStorage.write(sendOneParse, id);
  }

  public receiveCommonRoomGeteway(): CommonRoomGetewayInterface {
    return this.commonRoomGeteway;
  }
}
