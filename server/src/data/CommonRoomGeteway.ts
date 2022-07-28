import { HisotryInterface } from '../domain/abstracts';
import { CommonRoomGetewayInterface } from '../domain/gateway/room/commonRoom.geteway';

export class CommonRoomGeteway implements CommonRoomGetewayInterface {
  private chatHisotry: HisotryInterface = {};
  push(data: string, id: number): void {
    this.chatHisotry[id] = data;
  }
  getAll(): HisotryInterface {
    return this.chatHisotry;
  }
}
