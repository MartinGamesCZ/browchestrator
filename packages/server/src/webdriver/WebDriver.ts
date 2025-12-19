// Spec: https://www.w3.org/TR/webdriver2/
// Endpoints: https://www.w3.org/TR/webdriver2/#endpoints

import type { AxiosInstance } from "axios";
import type {
  WebDriverElementLocationStrategy,
  WebDriverGetSessionScreenshotResponse,
  WebDriverGetStatusResponse,
  WebDriverPostSessionElementResponse,
  WebDriverPostSessionResponse,
  WebDriverPostSessionUrlBody,
  WebDriverPostSessionUrlResponse,
} from "../types/WebDriver";
import axios from "axios";

export class WebDriver {
  #address: string;
  #client: AxiosInstance;

  constructor(address: string) {
    this.#address = address;
    this.#client = axios.create({
      baseURL: address,
      headers: {
        Host: `127.0.0.1:${new URL(address).port}`,
        "Content-Type": "application/json",
      },
    });
  }

  async #catchError<T>(fn: Promise<T>): Promise<
    | T
    | {
        data: {
          error: string;
        };
      }
  > {
    return await fn.catch((e) => ({
      data: {
        error: e.response?.data,
      },
    }));
  }

  // POST /session
  async postSession(): Promise<WebDriverPostSessionResponse> {
    const { data } = await this.#catchError(
      this.#client.post("/session", { capabilities: {} })
    );

    return data as WebDriverPostSessionResponse;
  }

  // DELETE /session/{sessionId}: TODO

  // GET /status
  async getStatus(): Promise<WebDriverGetStatusResponse> {
    const { data } = await this.#catchError(this.#client.get("/status"));

    return data as WebDriverGetStatusResponse;
  }

  // GET /session/{sessionId}/timeouts: TODO
  // POST /session/{sessionId}/timeouts: TODO

  // POST /session/{sessionId}/url
  async postSessionUrl(
    sid: string,
    body: WebDriverPostSessionUrlBody
  ): Promise<WebDriverPostSessionUrlResponse> {
    const { data } = await this.#catchError(
      this.#client.post(`/session/${sid}/url`, body)
    );

    return data as WebDriverPostSessionUrlResponse;
  }

  // GET	/session/{session id}/url: TODO
  // POST	/session/{session id}/back: TODO
  // POST	/session/{session id}/forward: TODO
  // POST	/session/{session id}/refresh: TODO
  // GET	/session/{session id}/title: TODO
  // GET	/session/{session id}/window: TODO
  // DELETE	/session/{session id}/window: TODO
  // POST	/session/{session id}/window: TODO
  // GET	/session/{session id}/window/handles: TODO
  // POST	/session/{session id}/window/new: TODO
  // POST	/session/{session id}/frame: TODO
  // POST	/session/{session id}/frame/parent: TODO
  // GET	/session/{session id}/window/rect: TODO
  // POST	/session/{session id}/window/rect: TODO
  // POST	/session/{session id}/window/maximize: TODO
  // POST	/session/{session id}/window/minimize: TODO
  // POST	/session/{session id}/window/fullscreen: TODO
  // GET	/session/{session id}/element/active: TODO
  // GET	/session/{session id}/element/{element id}/shadow: TODO

  // POST	/session/{session id}/element: TODO
  async postSessionElement(
    sid: string,
    using: WebDriverElementLocationStrategy,
    value: string
  ): Promise<WebDriverPostSessionElementResponse> {
    const { data } = await this.#catchError(
      this.#client.post(`/session/${sid}/element`, { using, value })
    );

    return data as WebDriverPostSessionElementResponse;
  }

  // POST	/session/{session id}/elements: TODO
  // POST	/session/{session id}/element/{element id}/element: TODO
  // POST	/session/{session id}/element/{element id}/elements: TODO
  // POST	/session/{session id}/shadow/{shadow id}/element: TODO
  // POST	/session/{session id}/shadow/{shadow id}/elements: TODO
  // GET	/session/{session id}/element/{element id}/selected: TODO
  // GET	/session/{session id}/element/{element id}/attribute/{name}: TODO
  // GET	/session/{session id}/element/{element id}/property/{name}: TODO
  // GET	/session/{session id}/element/{element id}/css/{property name}: TODO
  // GET	/session/{session id}/element/{element id}/text: TODO
  // GET	/session/{session id}/element/{element id}/name: TODO
  // GET	/session/{session id}/element/{element id}/rect: TODO
  // GET	/session/{session id}/element/{element id}/enabled: TODO
  // GET	/session/{session id}/element/{element id}/computedrole: TODO
  // GET	/session/{session id}/element/{element id}/computedlabel: TODO
  // POST	/session/{session id}/element/{element id}/click: TODO
  // POST	/session/{session id}/element/{element id}/clear: TODO
  // POST	/session/{session id}/element/{element id}/value: TODO
  // GET	/session/{session id}/source: TODO
  // POST	/session/{session id}/execute/sync: TODO
  // POST	/session/{session id}/execute/async: TODO
  // GET	/session/{session id}/cookie: TODO
  // GET	/session/{session id}/cookie/{name}: TODO
  // POST	/session/{session id}/cookie: TODO
  // DELETE	/session/{session id}/cookie/{name}: TODO
  // DELETE	/session/{session id}/cookie: TODO
  // POST	/session/{session id}/actions: TODO
  // DELETE	/session/{session id}/actions: TODO
  // POST	/session/{session id}/alert/dismiss: TODO
  // POST	/session/{session id}/alert/accept: TODO
  // GET	/session/{session id}/alert/text: TODO
  // POST	/session/{session id}/alert/text: TODO

  // GET	/session/{session id}/screenshot: TODO
  async getSessionScreenshot(
    sid: string
  ): Promise<WebDriverGetSessionScreenshotResponse> {
    const { data } = await this.#catchError(
      this.#client.get(`/session/${sid}/screenshot`)
    );

    return data as WebDriverGetSessionScreenshotResponse;
  }

  // GET	/session/{session id}/element/{element id}/screenshot: TODO

  // POST	/session/{session id}/print: unsupported by servo
}
