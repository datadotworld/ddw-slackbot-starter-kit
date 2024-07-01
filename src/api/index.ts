import * as dotenv from "dotenv";

import type { components, paths } from "../../types/api-v0";

dotenv.config();

type ANSWER_RESPONSES =
  paths["/v0/aice/{orgid}/{projectid}/answerTool"]["post"]["responses"];
type QUESTION = components["schemas"]["QuestionPayload"];

export type Response = Awaited<ReturnType<typeof api.answer>>;

const ENDPOINT = process.env.DDW_AICE_ENDPOINT;
const ORGID = process.env.DDW_AICE_ORG_ID;
const PROJECTID = process.env.DDW_AICE_PROJECT_ID;
const TOKEN = process.env.DDW_AICE_TOKEN;

const url = `${ENDPOINT}/v0/aice/${ORGID}/${PROJECTID}/answerTool`;

export const api = {
  answer: async (msg: QUESTION["question"]) => {
    const params: QUESTION = {
      question: msg,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (res.ok) {
        const data: ANSWER_RESPONSES["200"]["content"]["application/json"] =
          await res.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
    return {
      answer: "Sorry, I'm having trouble answering your question right now.",
    };
  },
};
