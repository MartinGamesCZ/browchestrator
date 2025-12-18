import { BrowchestratorClient } from "@browchestrator/client";

const client = await BrowchestratorClient.create({
  serverAddress: "http://localhost:3000",
});

const browser = client.createBrowser();
