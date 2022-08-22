const validation = (message) => {
  console.log(`\x1b[31m${message}\x1b[0m`);
  process.exit(1);
};

const questions = {
  name: {
    question: `\x1b[35mWhat's your name ? :\x1b[0m `,
    fn: (answer, res) => {
      if (answer.length <= 4 || answer.length >= 15)
        validation('Name must be more than 4 letters and less than 15 !!');
      console.log(
        `Thank you for your valuable feedback: \x1b[33m${answer}\x1b[0m `
      );
    },
  },
  age: {
    question: `\x1b[35mHow old are you ? :\x1b[0m `,
    fn: (answer, res) => {
      console.log(isNaN(+answer));
      if (isNaN(answer)) validation('Must be a number !!');
      answer =
        +answer >= 18 && +answer <= 35
          ? `Great age to start what to do: \x1b[33m${answer}\x1b[0m`
          : `Thanks for the answer: \x1b[33m${answer}\x1b[0m`;
      console.log(answer);
    },
  },
};
module.exports = questions;
