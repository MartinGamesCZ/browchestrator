import { Fmt } from "./Fmt";
import { Singleton } from "./Singleton";

export class Logger extends Singleton {
  static #format = "Browchestrator::{category:12: } {message}";

  static log(category: string, message: string) {
    console.log(Fmt.f(this.#format, { category, message }));
  }
}
