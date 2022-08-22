import { SendOne } from '../../entities/room/sendOne';

export interface SocketStorage {
  addSocket(id: number, scoket: any): void;
  deleteSocket(od: number): void;
  write(sendOne: string, id: number): void;
  writeAll(data: string): void;
}
