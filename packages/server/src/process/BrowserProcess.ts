import { spawn, type ChildProcess } from "child_process";
import type { Browser } from "../types/Browser";
import { BrowserPackageManager } from "../pm/BrowserPackageManager";
import type { BrowserSession } from "../session/BrowserSession";
import { Logger } from "../utils/Logger";
import { Fmt } from "../utils/Fmt";

export class BrowserProcess {
  #browser: Browser;
  #proc: ChildProcess | null = null;

  constructor(browser: Browser) {
    this.#browser = browser;
  }

  public async start(session: BrowserSession) {
    const path = BrowserPackageManager.getExecutable(this.#browser);
    if (!path) return false;

    Logger.log(
      "BrowserProc",
      Fmt.f("Starting browser process (session {session}, port {port})", {
        session: session.id,
        port: session.port,
      })
    );

    this.#proc = spawn(
      path,
      [
        "--headless",
        `--webdriver=${session.port}`,
        "--enable-experimental-web-platform-features",
      ],
      {
        stdio: "inherit",
      }
    );

    // TODO: Terminate session on process exit
    // Should throw error on client (maybe browser health checking?)

    return true;
  }
}
