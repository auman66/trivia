//Set up Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const airtable = require("airtable");

const base = new airtable({
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID);

//Twilio function call
//Params: qNum, correct_ans, player_ans, player_id, asked, q_id
exports.handler = async function (context, event, callback) {
  const player_ans = event.player_ans.trim().toUpperCase();
  const is_correct = player_ans == event.correct_ans;
  const asked = event.asked ? event.asked + "-" + event.qNum : event.qNum;

  let save = await base("QnA")
    .create([
      {
        fields: {
          question: [event.q_id],
          player_answer: player_ans,
          correct: is_correct,
          player: [event.player_id],
        },
      },
    ])
    .then((r) => {
      return "saved";
    })
    .catch((r) => {
      return "error";
    });

  callback(null, { is_correct, asked });
};
