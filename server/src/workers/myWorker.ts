import { Worker, WorkerOptions } from 'worker_threads';

export class MyWorker extends Worker {
  constructor(options?: WorkerOptions | undefined) {
    super(__dirname + '/worker.import.js', options);
  }
}
