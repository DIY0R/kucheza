import net from 'net';
import { SocketsStore } from '../SocketsStore';
describe('check Sockets Store', () => {
  const write = jest.fn();
  let socketsStore: any = {};
  let socket = { write };
  let id = 6;
  beforeEach(() => {
    write.mockClear();
    socketsStore = new SocketsStore();
    for (let i = 1; i <= id; i++) socketsStore.addSocket(i, socket);
  });

  test('for adding sockets', () => {
    expect(socketsStore.sockets.get(id)).toEqual(socket);
  });

  test('for delete socket', () => {
    socketsStore.deleteSocket(id);

    expect(socketsStore.sockets.get(id)).toBeUndefined();
  });

  test('for writeAll socket', () => {
    socketsStore.writeAll('hello world !');

    expect(write).toBeCalledTimes(socketsStore.sockets.size);
  });

  test('for write socket', () => {
    socketsStore.write(id, 'hello world !');

    expect(socketsStore.sockets.get(id).write).toBeCalledTimes(1);
  });
});
