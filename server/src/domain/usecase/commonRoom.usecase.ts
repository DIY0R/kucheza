import { SocketStorage } from '../abstracts';
import { CommonRoomGetewayInterface } from '../gateway/room/commonRoom.geteway';

export class commonRoomUseCase<S> {
  constructor(
    private socketStorage: SocketStorage<S & { write(daat: string): boolean }>,
    private commonRoomGeteway: CommonRoomGetewayInterface
  ) {}

  generalSendAndSave(data: string, id: number) {
    this.commonRoomGeteway.push(data.toString(), id);
    Object.values(this.socketStorage).forEach((socket) => {
      socket.write(data);
    });
  }
}
