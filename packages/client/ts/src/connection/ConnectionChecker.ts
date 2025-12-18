import axios from "axios";
import { semver } from "bun";
import { SRV_COMPAT_VERSION } from "../config";

export class ConnectionChecker {
  static async check(addr: string) {
    const url = new URL(addr);

    if (!url.pathname.endsWith("/")) url.pathname += "/";
    url.pathname += "serverinfo";

    const { data } = await axios
      .get(url.toString())
      .catch((e) => ({ data: { error: e.message } }));

    if ("error" in data) return false;
    if (data.prodname !== "Browchestrator") return false;

    if (!semver.satisfies(data.version, SRV_COMPAT_VERSION))
      throw new Error("Server version is not compatible");

    return true;
  }
}
