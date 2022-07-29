import net from 'net';
import { SocketFactory } from './app/SocketFactory';

const server = net.createServer(SocketFactory).listen(
  {
    host: 'localhost',
    port: 2000,
  },
  () => console.log('\x1b[46m%s\x1b[0m', 'LOG', 'server start !')
);
