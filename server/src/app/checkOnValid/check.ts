export function checkValid(fn: Function, ...param: any[]): void {
  try {
    fn(...param);
  } catch (error: any) {
    throw new Error(error);
  }
}
