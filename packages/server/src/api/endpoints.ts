import * as eServerInfo from "./endpoints/server_info";
import * as eBrowserCreate from "./endpoints/browser_create";
import * as eBrowserGoto from "./endpoints/browser_goto";
import * as eBrowserDomFindElement from "./endpoints/browser_dom_find_element";
import * as eBrowserScreenshot from "./endpoints/browser_screenshot";

export const endpoints = [
  eServerInfo,
  eBrowserCreate,
  eBrowserGoto,
  eBrowserDomFindElement,
  eBrowserScreenshot,
];
