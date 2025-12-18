import { ApiServer } from "./api/ApiServer";
import { BrowserPackageManager } from "./pm/BrowserPackageManager";
import { BrowserProcessOrchestrator } from "./process/BrowserProcessOrchestrator";
import { Browser } from "./types/Browser";
import { Logger } from "./utils/Logger";

Logger.log("Server", "Starting...");

await BrowserPackageManager.prepare(Browser.Servo);
await BrowserProcessOrchestrator.start();
await ApiServer.run(3000);

Logger.log("Server", "Ready");
