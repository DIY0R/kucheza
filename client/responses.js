const separation = require('./utils');

class Responses {
  one(res) {
    console.log(
      `\x1b[35mone-${res.senderName}->\x1b[0m`,
      JSON.parse(res.data).message
    );
  }
  all(res) {
    console.log(res);
    console.log(`\x1b[35mall-${res.id}->\x1b[0m`, JSON.parse(res.data).message);
  }
  info(res) {
    console.log(`\x1b[35minfo-->\x1b[0m`, res);
  }
}

const responseActions = new Responses();

const AllocateResponses = (data) => {
  const borders = ['{', '}'];
  const proper = separation(data.toString(), borders);
  proper.forEach((chunk) => {
    const res = JSON.parse(chunk);
    responseActions[res.summon](res);
  });
};

module.exports = AllocateResponses;
