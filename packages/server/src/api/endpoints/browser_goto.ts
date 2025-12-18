import express from "express";
import { BrowserProcessOrchestrator } from "../../process/BrowserProcessOrchestrator";

export const METHOD = "post";
export const PATH = "/browser/url";

export const handler = async (req: express.Request, res: express.Response) => {
  const result = await BrowserProcessOrchestrator.setSessionUrl(
    req.body.sid,
    req.body.url
  );

  if (typeof result == "string") {
    res.status(500).send({
      error: result,
    });

    return;
  }

  res.send({
    result: result,
  });
};
