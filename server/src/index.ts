import net from 'net';
import { Socket } from './app/SocketFactory';

const server = net.createServer(Socket).listen(
  {
    host: 'localhost',
    port: 2000,
  },
  () => console.log('\x1b[46m%s\x1b[0m', 'LOG', 'server start !')
);
