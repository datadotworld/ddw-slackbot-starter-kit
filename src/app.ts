import { App } from "@slack/bolt";
import * as dotenv from "dotenv";

import { registerListeners } from "./listeners";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

registerListeners(app);

(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log("Slackbot is running!");
  } catch (error) {
    console.error("Cannot start Slackbot", error);
  }
})();
