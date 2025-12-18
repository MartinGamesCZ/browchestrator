import { ApiServer } from "./api/ApiServer";
import { BrowserPackageManager } from "./pm/BrowserPackageManager";
import { Browser } from "./types/Browser";
import { Logger } from "./utils/Logger";

Logger.log("Server", "Starting...");

await BrowserPackageManager.prepare(Browser.Servo);
await ApiServer.run(3000);

Logger.log("Server", "Ready");
