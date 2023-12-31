// This function creates a new player in the Airtable

//Set up Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const airtable = require("airtable");

const base = new airtable({
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID);

const md5 = require("md5");

//Twilio function call
//Params: phone
exports.handler = async function (context, event, callback) {
  //Find or create the player
  let player = await base("Players")
    .create([
      {
        fields: {
          phone: event.phone,
          name: event.name,
        },
      },
    ])
    .then((records) => {
      return {
        id: records[0].getId(),
        playerCode: String(records[0].fields.playerCode).padStart(3, "0"),
        asked: "",
        name: event.name,
        score: 0,
      };
    })
    .catch((err) => console.error(err));

  // response.player = player;
  // console.log(player.asked.join("-"));

  callback(null, player);
};
