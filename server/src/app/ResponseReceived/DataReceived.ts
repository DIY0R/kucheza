import { commonRoomUseCase } from '../../domain/usecase/commonRoom.usecase';
import net from 'net';
export interface DataReceivedInterface {
  [key: string]: any;
}
export class DataReceived implements DataReceivedInterface {
  constructor(
    private readonly CommonRoomUseCase: commonRoomUseCase<net.Socket>
  ) {}
  all(res: object, id: number) {
    this.CommonRoomUseCase.generalSendAndSave(JSON.stringify(res), id);
  }
  one(res: { id: number; message: string }, ...param: any[]) {
    const { id, ...data } = res;
    this.CommonRoomUseCase.sendOne(JSON.stringify(data), id);
  }
}
