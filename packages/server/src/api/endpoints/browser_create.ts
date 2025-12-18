import express from "express";
import { BrowserProcessOrchestrator } from "../../process/BrowserProcessOrchestrator";
import { OrchestratorError } from "../../types/Error";

export const METHOD = "post";
export const PATH = "/browser/create";

export const handler = async (req: express.Request, res: express.Response) => {
  const session = await BrowserProcessOrchestrator.startSession();

  if (typeof session == "string") {
    res.status(500).send({
      error: session,
    });

    return;
  }

  res.send({
    id: session.id,
  });
};
