export type WebDriverSessionCapabilities = {
  acceptInsecureCerts: boolean;
  browserName: string;
  browserVersion: string;
  pageLoadStrategy: "normal" | "eager" | "none";
  platformName: string;
  proxy: {};
  setWindowRect: boolean;
  strictFileInteractability: boolean;
  timeouts: { implicit: number; pageLoad: number; script: number };
  unhandledPromptBehavior:
    | "dismiss and notify"
    | "accept and notify"
    | "dismiss"
    | "accept"
    | "ignore";
  userAgent: string;
};

export type WebDriverElementLocationStrategy =
  | "id"
  | "name"
  | "class name"
  | "tag name"
  | "xpath"
  | "css selector";

// ----------------------- Response/Body ------------------------

export type WebDriverError = {
  error: string;
};

export type WebDriverResponse<T> =
  | {
      value: T;
    }
  | WebDriverError;

export type WebDriverGetStatusResponse = WebDriverResponse<{
  ready: boolean;
  message: string;
}>;

export type WebDriverPostSessionResponse = WebDriverResponse<{
  sessionId: string;
  capabilities: WebDriverSessionCapabilities;
}>;

export type WebDriverPostSessionUrlBody = {
  url: string;
};

export type WebDriverPostSessionUrlResponse = WebDriverResponse<null>;

export type WebDriverPostSessionElementBody = {
  using: WebDriverElementLocationStrategy;
  value: string;
};

export type WebDriverPostSessionElementResponse = WebDriverResponse<{
  [key: string]: string;
}>;
