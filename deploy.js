const { TwilioServerlessApiClient } = require("@twilio-labs/serverless-api");
const { Twilio } = require("twilio");
const { readFile } = require("fs/promises");
const path = require("path");

require("dotenv").config();

const serverlessClient = new TwilioServerlessApiClient({
  username: process.env.TWILIO_ACCOUNT_SID,
  password: process.env.TWILIO_AUTH_TOKEN,
});
const client = new Twilio();

async function deploy() {
  console.log("Deploying Functions code");
  const result = await serverlessClient.deployLocalProject({
    cwd: process.cwd(),
    envPath: path.join(process.cwd(), ".env"),
    env: {
      AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
      AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    },
    pkgJson: JSON.parse(await readFile("package.json", "utf8")),
    serviceName: "trivia",
    functionsEnv: "dev",
    overrideExistingService: true,
  });

  console.log("Configuring Studio flow");
  const baseDomain = result.domain;
  const flowAsText = await readFile(
    "./assets/studio_flow.private.json",
    "utf8"
  );
  const updatedFlow = flowAsText.replace(
    /canada-trivia-4826-dev\.twil\.io/g,
    baseDomain
  );
  const flowDefinition = JSON.parse(updatedFlow);

  const flow = await client.studio.flows
    .create({
      commitMessage: "Trivia quiz automatic deploy",
      friendlyName: "Trivia",
      status: "published",
      definition: flowDefinition,
    })
    .then((flow) => flow)
    .catch((err) => {
      throw new Error(err.details);
    });

  console.log(
    `✨ Deployed Studio flow to: https://www.twilio.com/console/studio/flows/${flow.sid}`
  );
}

deploy().catch(console.error);
