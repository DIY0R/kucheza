import { HisotryInterface } from '../../abstracts';

export interface CommonRoomGetewayInterface {
  push(data: string, id: number): void;
  getAll(): HisotryInterface;
}
