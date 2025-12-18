import { ApiServer } from "./api/ApiServer";
import { Logger } from "./utils/Logger";

Logger.log("Server", "Starting...");

await ApiServer.run(3000);

Logger.log("Server", "Ready");
