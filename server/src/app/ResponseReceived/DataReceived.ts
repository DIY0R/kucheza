import { commonRoomUseCase } from '../../domain/usecase/commonRoom.usecase';
import net from 'net';

export class DataReceived {
  constructor(
    private readonly CommonRoomUseCase: commonRoomUseCase<net.Socket>
  ) {}
  all(res: object, id: number) {
    this.CommonRoomUseCase.generalSendAndSave(JSON.stringify(res), id);
  }
  one(res: { id: number; message: string; name: string }, ...param: any[]) {
    const { id, name, ...data } = res;
    this.CommonRoomUseCase.sendOne({
      data: JSON.stringify(data),
      id,
      senderName: res.name,
    });
  }
  connect(res: { info: Array<string> }, id: number) {
    this.CommonRoomUseCase.generalSendConecttion(res.info, id);
  }
}
