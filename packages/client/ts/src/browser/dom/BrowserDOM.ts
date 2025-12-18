import type { BrowchestratorClient } from "../../BrowchestratorClient";
import type { Browser } from "../Browser";
import { BrowserDOMElement } from "./BrowserDOMElement";

export class BrowserDOM {
  #client: BrowchestratorClient;
  #browser: Browser;

  constructor(client: BrowchestratorClient, browser: Browser) {
    this.#client = client;
    this.#browser = browser;
  }

  async querySelector(selector: string): Promise<BrowserDOMElement | null> {
    const { data } = await this.#client.apiClient.post("/browser/dom/element", {
      sid: this.#browser.sid,
      using: "css selector",
      value: selector,
    });

    return data.elementId ? new BrowserDOMElement(data.elementId) : null;
  }
}
