const net = require('net');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const questions = require('./question.js');
const AllocateResponses = require('./responses.js');

const rl = readline.createInterface({ input, output });
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

const startQuestions = async (connectToServer) => {
  const answers = [];
  
  for (let { question: questionText, fn: responseFunction } of Object.values(questions)) {
    const answer = await createQuestion(questionText);
    responseFunction(answer);
    answers.push(answer);
  }

  rl.on('line', (input) => {
    const inputCommand = input.split(' ');
    const command = inputCommand[0];
    
    if (command[0] !== '/') {
      return console.log('\x1b[41m%s\x1b[0m', 'ERROR', "can't recognize");
    }

    const recive = inputCommand.slice(1);

    const sender = recive.reduce((command, currentInfo) => {
      const [key, value] = currentInfo.split('=');
      return { ...command, [key]: value };
    }, {});

    socket.write(
      JSON.stringify({
        summon: command.substring(1),
        ...sender,
      }),
      'utf8'
    );
  });

  connectToServer(answers);
};

const connectToServer = (answers) => {
  socket.connect({ port: 2000, host: 'localhost' }, () => {
    console.log('\x1b[46m%s\x1b[0m', 'LOG', 'Connecting to server 🔛');
    socket.write(
      JSON.stringify({
        summon: 'connect',
        info: answers,
      }),
      'utf8'
    );
  });
};

startQuestions(connectToServer);

socket.on('data', AllocateResponses);
socket.on('error', (error) =>console.log('\x1b[41m%s\x1b[0m', 'ERROR', { ...error }));
process.on('SIGINT', () => socket.end(() => process.exit(0)));
rl.on('close', () => socket.end(() => process.exit(0)));
