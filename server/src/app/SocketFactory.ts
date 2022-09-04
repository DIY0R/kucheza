import net from 'net';
import { CommonRoomGeteway } from '../data/CommonRoomGeteway';

import { commonRoomUseCase } from '../domain/usecase/commonRoom.usecase';
import { checkValid } from './checkOnValid/check';
import { DataReceived } from './ResponseReceived/DataReceived';
import { SocketsStore } from '../data/SocketsStore';
const objSockets = new SocketsStore();
const CommonRoomUseCase = new commonRoomUseCase<net.Socket>(
  objSockets,
  new CommonRoomGeteway()
);
const dataReceived = new DataReceived(CommonRoomUseCase);

function forwardSocket(data: Buffer, id: number) {
  const clientData = JSON.parse(data.toString());
  
  dataReceived[clientData.summon as keyof typeof dataReceived](clientData, id);
}

export function SocketFactory(socket: net.Socket) {
  const id = Math.floor(Math.random() * 1000);
  socket.setNoDelay(true);
  objSockets.addSocket(id, socket);

  socket.write(
    JSON.stringify({
      summon: 'info',
      id,
      chat: CommonRoomUseCase.receiveCommonRoomGeteway().getAll(),
    })
  );

  socket.on('data', (data) => checkValid(forwardSocket, data, id));
  socket.on('end', () => {
    objSockets.deleteSocket(id);
    console.log(id, ' exist');
  });
  socket.on('error', (error) => {
    objSockets.deleteSocket(id);
    console.log('\x1b[41m%s\x1b[0m', 'ERROR', { id, ...error });
  });
}
