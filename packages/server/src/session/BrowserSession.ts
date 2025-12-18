import { randomBytes } from "crypto";
import { BrowserProcess } from "../process/BrowserProcess";
import { Browser } from "../types/Browser";

export class BrowserSession {
  #id: string;
  #lastActivity: number;
  #process: BrowserProcess;
  #port: number;
  #webdriverSid: string;

  constructor(port: number) {
    this.#id = randomBytes(16).toString("base64");
    this.#lastActivity = Date.now();
    this.#process = new BrowserProcess(Browser.Servo);
    this.#port = port;
    this.#webdriverSid = "";
  }

  get id() {
    return this.#id;
  }

  get process() {
    return this.#process;
  }

  get port() {
    return this.#port;
  }

  get webdriverSid() {
    return this.#webdriverSid;
  }

  set webdriverSid(sid: string) {
    this.#webdriverSid = sid;
  }
}
