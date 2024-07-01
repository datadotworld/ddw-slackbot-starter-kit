import { AllMiddlewareArgs, App, SlackEventMiddlewareArgs } from "@slack/bolt";

import { api } from "../../api";

async function invokeAice(question: string): Promise<string> {
  const res = await api.answer(question);
  return res.answer;
}

const aiceCallback = async ({
  client,
  message,
  say,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">) => {
  console.log("Message received: ", message);
  if (message.subtype && message.subtype === "bot_message") {
    console.log("Ignoring bot message");
    return;
  }
  if ("text" in message && message.text) {
    console.log("Message text: ", message.text);

    // Remove userid from the message
    const text = message.text.replace(/<@.*>/g, "").trim();

    await client.chat.postEphemeral({
      channel: message.channel,
      user: message.user,
      text: "Processing your question...",
    });

    const response = await invokeAice(text);

    // Post the final response to the channel
    await say(response);
  }
};

export const messages = {
  register: (app: App) => {
    app.message(aiceCallback);
  },
};
