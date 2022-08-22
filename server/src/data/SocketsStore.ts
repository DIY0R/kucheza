import net from 'net';

import { SocketStorage } from '../domain/gateway/room/socketStorage';

export class SocketsStore implements SocketStorage {
  private sockets = new Map<string | number, net.Socket>();
  private buffer = new SharedArrayBuffer(40);
  public addSocket(id: number, socket: net.Socket) {
    this.sockets.set(id, socket);
  }
  public deleteSocket(id: number) {
    this.sockets.delete(id);
  }
  public writeAll(data: string) {
    this.sockets.forEach((socket) => socket.write(data));
  }
  public write(sendOne: string, id: number): void {
    this.sockets.get(id)?.write(sendOne);
  }
}
