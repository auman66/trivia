//Set up Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const airtable = require("airtable");

const base = new airtable({
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID);

//Twilio function call
//Params: qNum, correct_ans, player_ans, player_id, asked
exports.handler = async function (context, event, callback) {
  const is_correct = event.player_ans.trim().toUpperCase() == event.correct_ans;
  const asked = event.asked ? event.asked + "-" + event.qNum : event.qNum;

  callback(null, { is_correct, asked });
};
