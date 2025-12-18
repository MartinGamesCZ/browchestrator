import * as eServerInfo from "./endpoints/server_info";
import * as eBrowserCreate from "./endpoints/browser_create";
import * as eBrowserGoto from "./endpoints/browser_goto";
import * as eBrowserDomFindElement from "./endpoints/browser_dom_find_element";

export const endpoints = [
  eServerInfo,
  eBrowserCreate,
  eBrowserGoto,
  eBrowserDomFindElement,
];
