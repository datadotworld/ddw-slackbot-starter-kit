import { App } from "@slack/bolt";

import { messages } from "./messages";

export const registerListeners = (app: App) => {
  messages.register(app);
};
