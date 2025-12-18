import express from "express";
import { BrowserProcessOrchestrator } from "../../process/BrowserProcessOrchestrator";

export const METHOD = "post";
export const PATH = "/browser/dom/element";

export const handler = async (req: express.Request, res: express.Response) => {
  const result = await BrowserProcessOrchestrator.findDomElement(
    req.body.sid,
    req.body.using,
    req.body.value
  );

  if (typeof result == "string") {
    res.status(500).send({
      error: result,
    });

    return;
  }

  res.send({
    elementId: result.elementId,
  });
};
