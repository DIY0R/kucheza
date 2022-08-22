const net = require('net');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const questions = require('./question.js');
const AllocateResponses = require('./responses.js');

const socket = new net.Socket();

const createQuestion = (theQuestion) => {
  return new Promise((resolve, reject) => {
    try {
      rl.question(theQuestion, (theAnswer) => resolve(theAnswer));
    } catch (err) {
      rl.close();
    }
  });
};
const startQuestions = async (connecttoServer) => {
  const answers = [];
  for (let [
    _,
    { question: questionText, fn: responseFunction },
  ] of Object.entries(questions)) {
    const answer = await createQuestion(questionText);
    responseFunction(answer);
    answers.push(answer);
  }
  // rl.close();
  rl.on('line', (input) => {
    // console.dir(socket);
  });
  connecttoServer(answers);
};

const connecttoServer = (answers) => {
  socket.connect(
    {
      port: 2000,
      host: 'localhost',
    },
    () => {
      console.log('\x1b[46m%s\x1b[0m', 'LOG', 'Сlient connect to server 🔛');
      socket.write(
        JSON.stringify({
          summon: 'connect',
          info: answers,
        }),
        'utf8'
      );
    }
  );
};
startQuestions(connecttoServer);
socket.on('data', AllocateResponses);
socket.on('error', (error) =>
  console.log('\x1b[41m%s\x1b[0m', 'ERROR', { ...error })
);

process.on('SIGINT', () => socket.end(() => process.exit(0)));
