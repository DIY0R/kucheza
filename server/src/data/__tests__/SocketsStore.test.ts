import net from 'net';
import { SocketsStore } from '../SocketsStore';
describe('check Sockets Store', () => {
  let socketsStore: any = {};
  let sendMessage = { name: 'hello', id: 6 };
  let id = 6;
  beforeEach(() => {
    socketsStore = new SocketsStore();
  });
  test('for adding sockets', () => {
    socketsStore.addSocket(id, sendMessage);
    expect(socketsStore.sockets.get(id)).toEqual(sendMessage);
  });

  test('for delete socket', () => {
    socketsStore.deleteSocket(id);
    expect(socketsStore.sockets.get(id)).toBeUndefined();
  });
});
