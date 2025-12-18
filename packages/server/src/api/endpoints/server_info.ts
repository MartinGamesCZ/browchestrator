import express from "express";
import { SRV_VERSION } from "../../config";

export const METHOD = "get";
export const PATH = "/serverinfo";

export const handler = async (req: express.Request, res: express.Response) => {
  res.send({
    prodname: "Browchestrator",
    version: SRV_VERSION,
  });
};
