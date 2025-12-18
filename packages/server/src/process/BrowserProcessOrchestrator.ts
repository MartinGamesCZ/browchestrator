import { WEBDRIVER_PORT_RANGE } from "../config";
import { BrowserSession } from "../session/BrowserSession";
import { OrchestratorError } from "../types/Error";
import { Fmt } from "../utils/Fmt";
import { Logger } from "../utils/Logger";
import { Singleton } from "../utils/Singleton";
import { WebDriver } from "../webdriver/WebDriver";

export class BrowserProcessOrchestrator extends Singleton {
  #sessions: Set<BrowserSession> = new Set();

  constructor() {
    super();
  }

  static async start() {
    Logger.log("BrowserPO", "Starting orchestartor...");
  }

  static async startSession() {
    Logger.log("BrowserPO", "Starting session...");

    const port = BrowserProcessOrchestrator.requestPort();
    if (!port) {
      Logger.log("BrowserPO", "No free port left");

      return OrchestratorError.NoFreePort;
    }

    const session = new BrowserSession(port);
    this.getInstance(BrowserProcessOrchestrator).#sessions.add(session);

    Logger.log("BrowserPO", "Starting browser process...");
    const startRes = await session.process.start(session);
    if (!startRes) return OrchestratorError.BrowserProcessStartFailed;

    // TODO: Replace for proper waiting for browser to start
    //       maybe by making it open some url on load
    await new Promise((resolve) => setTimeout(resolve, 100));

    Logger.log("BrowserPO", "Starting webdriver session...");
    const webdriver = new WebDriver(`http://localhost:${port}`);
    const wdSession = await webdriver.postSession();
    if ("error" in wdSession)
      return OrchestratorError.WebdriverSessionCreationFailed;

    session.webdriverSid = wdSession.value.sessionId;

    Logger.log("BrowserPO", "Session created");

    return session;
  }

  static async setSessionUrl(sid: string, url: string) {
    const session = this.getInstance(BrowserProcessOrchestrator)
      .#sessions.values()
      .find((s) => s.id == sid);
    if (!session) return OrchestratorError.SessionNotFound;

    Logger.log(
      "BrowserPO",
      Fmt.f("Setting session {sid} url to {url}", { sid, url })
    );

    const webdriver = new WebDriver(`http://localhost:${session.port}`);
    const wdSession = await webdriver.postSessionUrl(session.webdriverSid, {
      url,
    });
    if ("error" in wdSession)
      return OrchestratorError.WebdriverSessionCreationFailed;

    return true;
  }

  static getFreePorts() {
    const usedPorts: number[] = [];

    this.getInstance(BrowserProcessOrchestrator).#sessions.forEach((s) => {
      usedPorts.push(s.port);
    });

    const ports = new Array(WEBDRIVER_PORT_RANGE[1] - WEBDRIVER_PORT_RANGE[0])
      .fill(-1)
      .map((_, i) => WEBDRIVER_PORT_RANGE[0] + i)
      .filter((p) => !usedPorts.includes(p));

    return ports;
  }

  static requestPort(): number | null {
    const fp = this.getFreePorts();
    if (fp.length == 0) return null;

    return fp[Math.floor(Math.random() * fp.length)]!;
  }
}
