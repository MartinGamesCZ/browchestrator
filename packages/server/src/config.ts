import { readFile } from "fs/promises";
import path from "path";
import { Browser } from "./types/Browser";

export const SRV_VERSION = JSON.parse(
  await readFile(path.join(process.cwd(), "package.json"), "utf-8")
).version;

export const RESOURCE_DIR = path.join(process.cwd(), ".browchestrator");

export const BROWSER_REPOS = {
  [Browser.Servo]:
    "https://download.servo.org/nightly/linux/servo-x86_64-linux-gnu.tar.gz",
};
export const BROWSER_EXECS = {
  [Browser.Servo]: "servo/servo",
};
export const BROWSER_REG_DIR = path.join(RESOURCE_DIR, "browsers");
export const BROWSER_REG_META = path.join(BROWSER_REG_DIR, "pm.json");
