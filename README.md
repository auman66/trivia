# trivia
[![Twilio CI/CD](https://github.com/auman66/trivia/actions/workflows/main.yml/badge.svg)](https://github.com/auman66/trivia/actions/workflows/main.yml)

Trivia game using Twilio Serverless + Studio and Airtable. 

The airtable base can be found here: https://www.airtable.com/universe/expoG211sJu9ZcMbz/twilio-trivia-game

## How to deploy:
1. Set up the [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started)
2. Clone this repository into a new folder
3. Copy [example.env](example.env), rename it `.env` and add your AIRTABLE_BASE_ID & AIRTABLE_API_KEY.
4. cd into the this directory and run `twilio serverless:deploy`
   - This will deploy your code to your active twilio profile
5. Create a new studio flow using JSON import
   1. Copy the [studio_flow json](assets/studio_flow.private.json) into the new flow & save
   2. Update all the functions to point to your recently deployed Serverless Function
   3. Update all webhooks to point to the correct Airtable webhook

## Customizing the Trivia game:
1. Update the questions table, including all text fields and correct answer.
   - (optional) To update images... 
      1. clear out and replace any images you want to use in the images folder
      2. Run `twilio serverless:deploy` after you add the images (or any time you later add images)
      3. Navigate to this function in your twilio console and take note of the asset/image urls.
      4. Add the image url to the image url field for the question
2. Run the twilio locally `twilio serverless:run`
3. Use an API tool (like Postman) to hit the `/q_to_json` endpoint
4. Copy the output JSON into the [questions file](/assets/questions.private.json), removing the old json
5. Run `twilio serverless:deploy` to update to the new questions.

ToDo: 
- Instructions for setting up the webhook in airtable.
- Adding sample data to the airtable template.
