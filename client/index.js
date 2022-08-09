const net = require('net');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const questions = require('./question.js');
const socket = new net.Socket();

const createQuestion = (theQuestion) => {
  return new Promise((resolve, reject) => {
    try {
      rl.question(theQuestion + ': ', (theAnswer) => resolve(theAnswer));
    } catch (err) {
      reject(err);
    }
  });
};
const startQuestions = (async () => {
  for (let [
    _,
    { question: questionText, fn: responseFunction },
  ] of Object.entries(questions)) {
    const answer = await createQuestion(questionText);
    responseFunction(answer);
  }
  rl.close();
})();

const connecttoServer = () => {
  socket.connect(
    {
      port: 2000,
      host: 'localhost',
    },
    () => {
      console.log('\x1b[46m%s\x1b[0m', 'LOG', 'Сlient connect to server 🔛');
      socket.write(
        JSON.stringify({ summon: 'all', messagae: 'hello server from client' }),
        'utf8'
      );
    }
  );
};
rl.on('close', connecttoServer);
socket.on('data', (data) => {
  console.log('server->' + data.toString().split(','));
});
socket.on('error', (error) =>
  console.log('\x1b[41m%s\x1b[0m', 'ERROR', { ...error })
);

process.on('SIGINT', () => socket.end(() => process.exit(1)));
