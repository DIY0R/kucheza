import { commonRoomUseCase } from '../../domain/usecase/commonRoom.usecase';
import net from 'net';

export class DataReceived {
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
