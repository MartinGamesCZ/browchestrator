import { BrowchestratorClient } from "@browchestrator/client";
import { startWebserver } from "./webserver";

await startWebserver();

const client = await BrowchestratorClient.create({
  serverAddress: "http://localhost:3000",
});

const browser = await client.createBrowser();
browser.openURL("http://localhost:8080");

const element = await browser.dom.querySelector(".pageTitle");
console.log(element);
