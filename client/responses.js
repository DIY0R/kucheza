class Responses {
  one(res) {}
  all(data) {}
  info(data) {
    console.log(data);
  }
}

const responseActions = new Responses();
let arr = '';
const AllocateResponses = (data) => {
  arr += data;

  // responseActions[response.summon](response);
};
module.exports = AllocateResponses;
