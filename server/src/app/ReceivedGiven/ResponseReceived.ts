import net from 'net';

import { commonRoomUseCase } from '../../domain/usecase/commonRoom.usecase';

export class ResponseReceived {
  constructor(CommonRoomUseCase: commonRoomUseCase<net.Socket>) {}
  allParticipants() {}
  oneParticipant() {}
}
