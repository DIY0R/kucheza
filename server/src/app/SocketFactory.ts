import net from 'net';

import { CommonRoomGeteway } from '../data/CommonRoomGeteway';
import { SocketStorage } from '../domain/abstracts';
import { commonRoomUseCase } from '../domain/usecase/commonRoom.usecase';
import { ResponseReceived } from './ReceivedGiven/ResponseReceived';

const objSockets: SocketStorage<net.Socket> = {};

const CommonRoom = new commonRoomUseCase<net.Socket>(
  objSockets,
  new CommonRoomGeteway()
);
const responseReceived = new ResponseReceived(CommonRoom);

export function Socket(socket: net.Socket) {
  const id = Math.floor(Math.random() * 1000);
  socket.setNoDelay(true);
  const sk = socket.setKeepAlive(true);

  socket.write(JSON.stringify(CommonRoom.ReceiveCommonRoomGeteway().getAll()));
  objSockets[id] = socket;

  socket.on('data', (data) =>
    CommonRoom.generalSendAndSave(data.toString(), id)
  );

  socket.on('end', () => {
    delete objSockets[id];
    console.log(id, ' exist');
  });
  socket.on('error', (error) => {
    delete objSockets[id];
    console.log('\x1b[41m%s\x1b[0m', 'ERROR', { ...error });
  });
}
