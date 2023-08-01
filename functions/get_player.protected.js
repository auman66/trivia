// This function checks airtable for an existing player and, if found, pull that players information

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
    .select({
      filterByFormula: `{phone}='${event.phone}'`,
    })
    .all()
    .then((records) => {
      if (records.length > 0) {
        return {
          id: records[0].getId(),
          asked: records[0].fields.asked || "",
          name: records[0].fields.name,
          score: records[0].fields.score,
          qCount: records[0].fields.qCount,
          new_player: false,
        };
        // If no player is found, new player needed
      } else
        return {
          new_player: true,
        };
    })
    .catch((err) => console.error(err));

  callback(null, player);
};
