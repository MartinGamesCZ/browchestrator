import express from "express";
import { Singleton } from "../utils/Singleton";
import { endpoints } from "./endpoints";
import { Logger } from "../utils/Logger";
import { Fmt } from "../utils/Fmt";

export class ApiServer extends Singleton {
  #expressApp: express.Application;

  constructor() {
    super();

    this.#expressApp = express();
    this.#expressApp.use(express.json());
    this.#expressApp.use(this.#loggingMiddleware);
  }

  async #listen(port: number) {
    await new Promise<void>((r) => this.#expressApp.listen(port, () => r()));
  }

  #loggingMiddleware(
    req: express.Request,
    res: express.Response,
    next: () => void
  ) {
    const start = performance.now();

    res.on("finish", () => {
      Logger.log(
        "ApiServer",
        Fmt.f("{method} {path} ({time}ms)", {
          method: req.method,
          path: req.path,
          time: (performance.now() - start).toFixed(2),
        })
      );
    });

    next();
  }

  #attachEndpoints() {
    Logger.log("ApiServer", "Attaching endpoints...");

    endpoints.map((e) => {
      this.#expressApp[e.METHOD](e.PATH, e.handler);

      Logger.log(
        "ApiServer",
        Fmt.f("Attached endpoint {method} {path}", {
          method: e.METHOD,
          path: e.PATH,
        })
      );
    });
  }

  static async run(port: number) {
    Logger.log("ApiServer", Fmt.f("Starting on port {port}", { port }));

    const apiServer = ApiServer.getInstance(ApiServer);

    apiServer.#attachEndpoints();
    await apiServer.#listen(port);
  }
}
