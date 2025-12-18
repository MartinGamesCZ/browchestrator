import { BrowchestratorClient } from "@browchestrator/client";

const client = await BrowchestratorClient.create({
  serverAddress: "http://localhost:3000",
});

const browser = await client.createBrowser();
browser.openURL("https://google.com");
