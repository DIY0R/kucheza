import net from 'net';
import { SocketStorage } from '../domain/gateway/room/socketStorage';

export class SocketsStore implements SocketStorage {
  //   private objSockets: SocketStorage<net.Socket> = {};
  private sockets = new Map<string | number, net.Socket>();
  public addSocket(id: number, scoket: net.Socket) {
    this.sockets.set(id, scoket);
  }
  public deleteSocket(id: number) {
    this.sockets.delete(id);
  }

  public writeAll(data: string) {
    Object.values(this.sockets).forEach((socket) => {
      socket.write(data);
    });
  }
  public write(id: number, data: string): void {
    this.sockets.get(id)?.write(data);
  }
}
