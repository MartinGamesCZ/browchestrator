import { Browser } from "./browser/Browser";
import { ConnectionChecker } from "./connection/ConnectionChecker";
import type { ClientOptions } from "./types/Client";

export class BrowchestratorClient {
  #serverAddress: string;

  private constructor(opts: ClientOptions) {
    this.#serverAddress = opts.serverAddress;
  }

  public createBrowser() {
    return new Browser(this);
  }

  static async create(opts: ClientOptions) {
    const available = await ConnectionChecker.check(opts.serverAddress);
    if (!available) throw new Error("Browchestrator server not available");

    return new BrowchestratorClient(opts);
  }
}
