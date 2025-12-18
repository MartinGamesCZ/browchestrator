// sailet.config.ts

import { script, step, cmd } from "sailet";

script("test", () => [
  step("Start test docker compose", () => [
    cmd("cd test &&docker compose up --build"),
  ]),
]);
