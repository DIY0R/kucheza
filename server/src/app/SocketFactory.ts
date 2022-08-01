import net from 'net';
import { CommonRoomGeteway } from '../data/CommonRoomGeteway';
import { SocketStorage } from '../domain/abstracts';
import { commonRoomUseCase } from '../domain/usecase/commonRoom.usecase';
import { checkValid } from './checkOnValid/check';
import { DataReceived } from './ResponseReceived/DataReceived';
import { ResponseClient } from './ResponseReceived/ResponseClient';

const objSockets: SocketStorage<net.Socket> = {};

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
  const sk = socket.setKeepAlive(true);
  objSockets[id] = socket;

  socket.write(
    JSON.stringify(CommonRoomUseCase.receiveCommonRoomGeteway().getAll())
  );

  socket.on('data', (data) => checkValid(forwardSocket, data, id));
  socket.on('end', () => {
    delete objSockets[id];
    console.log(id, ' exist');
  });
  socket.on('error', (error) => {
    delete objSockets[id];
    console.log('\x1b[41m%s\x1b[0m', 'ERROR', { id, ...error });
  });
}
