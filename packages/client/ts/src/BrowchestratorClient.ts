import type { AxiosInstance } from "axios";
import { Browser } from "./browser/Browser";
import { ConnectionChecker } from "./connection/ConnectionChecker";
import type { ClientOptions } from "./types/Client";
import axios from "axios";

export class BrowchestratorClient {
  #serverAddress: string;
  #apiClient: AxiosInstance;

  private constructor(opts: ClientOptions) {
    this.#serverAddress = opts.serverAddress;
    this.#apiClient = axios.create({
      baseURL: this.#serverAddress,
    });
  }

  public async createBrowser() {
    const browser = new Browser(this);
    await browser.create();

    return browser;
  }

  static async create(opts: ClientOptions) {
    const available = await ConnectionChecker.check(opts.serverAddress);
    if (!available) throw new Error("Browchestrator server not available");

    return new BrowchestratorClient(opts);
  }

  public get apiClient() {
    return this.#apiClient;
  }
}
