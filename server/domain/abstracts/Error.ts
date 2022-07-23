export interface ErrorGenerator {
  message: string;
  status: number;
  more?: string;
}
