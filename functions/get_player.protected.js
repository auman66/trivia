//Set up Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const airtable = require("airtable");

const base = new airtable({
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE_ID);

//Twilio function call
//Params: phone
exports.handler = async function (context, event, callback) {
  //Find or create the player
  let player = await base("Players")
    .select({
      filterByFormula: `{phone}=${event.phone.substring(1)}`,
    })
    .all()
    .then((records) => {
      if (records.length > 0) {
        return {
          id: records[0].getId(),
          asked: records[0].fields.asked || "",
          // asked: records[0].fields.asked
          //   ? records[0].fields.asked.split("-")
          //   : [],
        };
      } else return null;
    })
    .catch((err) => console.error(err));
  // If no player is found, create one
  if (!player) {
    player = await base("Players")
      .create([
        {
          fields: {
            phone: event.phone,
          },
        },
      ])
      .then((records) => {
        return {
          id: records[0].getId(),
          asked: "",
          // name: "false",
        };
      })
      .catch((err) => console.error(err));
  }

  // response.player = player;
  // console.log(player.asked.join("-"));

  callback(null, player);
};
