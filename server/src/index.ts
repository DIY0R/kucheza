import net from 'net';
import { CommonRoomGeteway } from './data/CommonRoomGeteway';
import { SocketStorage } from './domain/abstracts';
import { commonRoomUseCase } from './domain/usecase/commonRoom.usecase';

const objSockets: SocketStorage<net.Socket> = {};

const commonRoomGeteway = new CommonRoomGeteway();
const CommonRoom = new commonRoomUseCase<net.Socket>(
  objSockets,
  commonRoomGeteway
);

const server = net
  .createServer((socket) => {
    const id = Math.floor(Math.random() * 1000);
    socket.setNoDelay(true);
    const sk = socket.setKeepAlive(true);

    socket.write(JSON.stringify(commonRoomGeteway.getAll()));
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
  })
  .listen(
    {
      host: 'localhost',
      port: 2000,
    },
    () => console.log('\x1b[46m%s\x1b[0m', 'LOG', 'server start !')
  );
