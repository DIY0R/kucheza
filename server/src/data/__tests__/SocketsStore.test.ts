import net from 'net';
import { SocketsStore } from '../SocketsStore';
describe('check Sockets Store', () => {
  let socketsStore: any = {};
  beforeEach(() => {
    socketsStore = new SocketsStore();
  });
  test('for adding sockets', () => {
    let sendMessage = { name: 'hello', id: 6 };
    let id = 6;
    socketsStore.addSocket(id, sendMessage);
    expect(socketsStore.sockets.get(id)).toEqual(sendMessage);
  });
});
