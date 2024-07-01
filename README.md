# Slackbot Starter Kit for data.world's AI Context Engine

This starter kit will let you quickly get started with data.world's AI Context Engine.™ It is a simple Slack app that demonstrates how to use the data.world API to send a question to the AI Context Engine and display its response in a conversation in Slack.

## Getting started

### Pre-requisites

- Node.js v20+
- A Slack account
- A [data.world](https://data.world) account, with an AI Context Engine License and available Knowledge Tokens

### Installation

First, fetch this repo however you like:

- Clone it using the web URL

  ```sh
  git clone https://github.com/datadotworld/ddw-slackbot-starter-kit.git
  ```

or

- Use the GitHub CLI

  ```sh
  gh repo clone datadotworld/ddw-slackbot-starter-kit
  ```

or

- Download it via this link [ddw-slackbot-starter-kit.zip](https://github.com/datadotworld/ddw-slackbot-starter-kit/archive/refs/heads/main.zip) and unzip it.

Then, navigate to the project directory:

```sh
$ cd ddw-slackbot-starter-kit
```

Get a data.world token (either as [an individual user](https://developer.data.world/docs/api-keys-and-auth#method-2-acquiring-tokens-via-the-ui) for development, or from a [service account](https://docs.data.world/en/130574-creating-and-managing-service-accounts.html) for deployment), copy `.env.example` to `.env`, filling in the following values.
You will also need tokens from Slack, as [described here, in their documentation](https://api.slack.com/tutorials/tracks/first-bolt-app#create-app).

```sh
DDW_AICE_ENDPOINT=https://api.data.world
DDW_AICE_ORG_ID=# your organization ID
DDW_AICE_PROJECT_ID=# your project ID
DDW_AICE_TOKEN=# your data.world token

PORT=3000

SLACK_BOT_TOKEN=# your Slack bot token from the Slack API
SLACK_SIGNING_SECRET=# your Slack signing secret from the Slack API
```

In the vast majority of most cases, you'll be able to leave the default `api_endpoint` value as is.

### Running the app

To install dependencies, run:

```sh
$ npm install
```

Then, to start the bot locally, run:

```sh
$ npm run dev
```

From here, you can use a tool like [ngrok](https://ngrok.com/) to expose your local server to the internet.

```sh
$ ngrok http 3000
```

You can then use the URL provided by ngrok to set up your Slack app's event subscriptions and interactive components. You can find these settings in the Slack API settings for your app, under the "Event Subscriptions" section.

>https://api.slack.com/apps/YR_APP_ID/event-subscriptions

You'll enter your URL with the path `/slack/events` appended to it.

>https://YR_NGROK_URL/slack/events

Once the URL has been verified, you can then start chatting with your bot in Slack via DM.

#### Running with Docker

Alternatively, we have included a Dockerfile suitable for local development or for deploying your Slackbot. To build the Docker image, run:

```sh
$ docker build -t yr-slackbot .
```

Ensure that the `.env` file is in the same directory as the Dockerfile. To run the Docker container, run:

```sh
$ docker run --env-file .env yr-slackbot
```

#### Starting the Application with Docker

To start the application using Docker, you can use the following command:

```sh
docker run -p 3000:3000 --env-file .env yr-slackbot
```

This command runs the Docker container and maps port 3000 of the container to port 3000 on your host, ensuring the application is accessible. Make sure the `.env` file is correctly configured as it will be used by the application running inside the Docker container.

#### Starting the Application with Docker Compose

Alternatively, you can use `docker-compose` to start the application. This method is useful if you plan to run multiple services. To start the application using `docker-compose`, run:

```sh
docker-compose up
```

This command reads the `docker-compose.yml` file and starts the application as defined. It automatically builds the image if it's not already built and starts the services specified. The application will be accessible on port 3000.

### Developing the app

The app is built using [Bolt for JavaScript](https://slack.dev/bolt-js/). You can find the documentation for Bolt [here](https://slack.dev/bolt-js/).
For the codebase, the primary logic is split between `listeners/messages/index.ts` and `api/index.ts`. The API calls to the AI Context Engine are fully-typed, using generated type definitions from the data.world API's OpenAPI spec. Those type definitions are in `types/api-v0.d.ts`.

### Deploying the app

You can deploy the app anywhere that can serve a Docker image.

The app is ready to be deployed to Heroku. To do so, you will need to have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed. You will also need to have a Heroku account.

#### Deploying to Heroku

After installing the Heroku CLI, you can deploy the app to Heroku by running the following commands:

```sh
heroku login
```

```sh
heroku create <app-name> -t <team-name>
```

Set the fields from the `.env` file as Heroku environment variables in the Heroku dashboard for the app you just created.

Then, push the code to Heroku:

```sh
git push heroku main
```

Once you have the URL for your app, update the field `settings.event_subscriptions.request_url` in either the `manifest.json` or the Slack API settings for your app, under the "Event Subscriptions" section, to point to the URL of your Heroku app.
