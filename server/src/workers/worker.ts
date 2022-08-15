const { workerData, parentPort } = require('worker_threads');

parentPort.postMessage({ id: process.pid });
