import { mkdir } from "fs/promises";
import { pipeline } from "stream/promises";
import type { Browser, BrowserMeta } from "../types/Browser";
import { Fmt } from "../utils/Fmt";
import { Logger } from "../utils/Logger";
import { Singleton } from "../utils/Singleton";
import {
  BROWSER_EXECS,
  BROWSER_REG_DIR,
  BROWSER_REG_META,
  BROWSER_REPOS,
} from "../config";
import { createWriteStream, existsSync } from "fs";
import { writeFile } from "fs/promises";
import { readFile } from "fs/promises";
import axios from "axios";
import path from "path";
import * as tar from "tar";
import { $ } from "bun";

export class BrowserPackageManager extends Singleton {
  #browsers: Map<Browser, BrowserMeta> = new Map();

  constructor() {
    super();
  }

  async #prepFs() {
    if (existsSync(BROWSER_REG_META)) return;

    await mkdir(BROWSER_REG_DIR, {
      recursive: true,
    });
    await writeFile(BROWSER_REG_META, "{}");
  }

  async #parseMeta() {
    const meta = await readFile(BROWSER_REG_META, "utf-8");
    this.#browsers = new Map(
      Object.entries(JSON.parse(meta)) as [Browser, BrowserMeta][]
    );
  }

  async #download(browser: Browser) {
    const repo = BROWSER_REPOS[browser];

    const response = await axios.get(repo, {
      responseType: "stream",
    });

    await pipeline(response.data, tar.x({ C: BROWSER_REG_DIR }));

    this.#browsers.set(browser, {
      executablePath: path.join(BROWSER_REG_DIR, BROWSER_EXECS[browser]),
    });

    await this.#saveMeta();
  }

  async #saveMeta() {
    await writeFile(
      BROWSER_REG_META,
      JSON.stringify(Object.fromEntries(this.#browsers))
    );
  }

  async #check(browser: Browser) {
    const b = this.#browsers.get(browser);
    if (!b) return false;
    if (!existsSync(b.executablePath)) return false;

    // Check if -V returns non-zero code
    try {
      const { exitCode } = await $`${b.executablePath} -V`.quiet();
      return exitCode === 0;
    } catch {
      return false;
    }
  }

  static async prepare(browser: Browser) {
    Logger.log("BrowserPM", Fmt.f("Preparing browser {browser}", { browser }));

    const pm = BrowserPackageManager.getInstance(BrowserPackageManager);
    await pm.#prepFs();
    await pm.#parseMeta();

    if (!pm.#browsers.has(browser) || !(await pm.#check(browser))) {
      Logger.log(
        "BrowserPM",
        Fmt.f("Browser {browser} not found, downloading...", { browser })
      );

      await pm.#download(browser);
    }

    await pm.#saveMeta();

    Logger.log("BrowserPM", Fmt.f("Browser {browser} ready", { browser }));
  }

  static getExecutable(browser: Browser) {
    const pm = BrowserPackageManager.getInstance(BrowserPackageManager);

    return pm.#browsers.get(browser)?.executablePath;
  }
}
