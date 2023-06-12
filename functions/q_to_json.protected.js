//Set up Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const airtable = require("airtable");

const base = new airtable({
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID);

//Twilio function call
//Params: question, correct_ans, player_ans
exports.handler = async function (context, event, callback) {
  //Find or create the player
  console.log("here I am");
  let questions = await base("Questions")
    .select()
    .all()
    .then((records) => {
      let qs = {};
      records.forEach((r) => {
        qs[r.fields.qNum] = {
          question: r.fields.question,
          answer: r.fields.answer,
        };
      });
      return qs;
    })
    .catch((err) => console.error(err));

  // response.player = player;
  // console.log(player.asked.join("-"));

  callback(null, questions);
};
