import { BrowchestratorClient } from "@browchestrator/client";
import { startWebserver } from "./webserver";
import { writeFile } from "fs/promises";

await startWebserver();

const client = await BrowchestratorClient.create({
  serverAddress: "http://localhost:3000",
});

for (let i = 0; i < 100; i++) {
  const start = performance.now();
  const browser = await client.createBrowser();
  browser.openURL("http://localhost:8080");

  const screenshot = await browser.screenshot();
  const end = performance.now();

  console.log(`Took ${end - start}ms`);
  await writeFile("screenshot.png", screenshot, "base64");
}
