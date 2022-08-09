export interface SocketStorage {
  addSocket(id: number, scoket: any): void;
  deleteSocket(od: number): void;
  write(id: number, data: string): void;
  writeAll(data: string): void;
}
