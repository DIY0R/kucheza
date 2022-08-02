const questions = {
  name: {
    question: `What's your name ?`,
    fn: (answer, res) => {
      console.log(`Thank you for your valuable feedback: ${answer}`);
    },
  },
  age: {
    question: `How old are you`,
    fn: (answer, res) => {
      console.log(`Thank you for your valuable feedback: ${answer}`);
    },
  },
};
module.exports = questions;
