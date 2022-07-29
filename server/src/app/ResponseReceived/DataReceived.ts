import { commonRoomUseCase } from '../../domain/usecase/commonRoom.usecase';
import net from 'net';

export class DataReceived {
  constructor(
    private readonly CommonRoomUseCase: commonRoomUseCase<net.Socket>
  ) {}
  SendAllParticipants(data: Buffer, id: number) {
    this.CommonRoomUseCase.generalSendAndSave(data.toString(), id);
  }
  SendOneParticipant() {}
}
