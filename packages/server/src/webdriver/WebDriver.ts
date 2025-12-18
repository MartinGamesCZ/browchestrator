// Spec: https://www.w3.org/TR/webdriver2/
// Endpoints: https://www.w3.org/TR/webdriver2/#endpoints

import type { AxiosInstance } from "axios";
import type {
  WebDriverGetStatusResponse,
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

  // TODO: Rest of spec
}
