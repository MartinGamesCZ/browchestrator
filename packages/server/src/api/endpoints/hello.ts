import express from "express";

export const METHOD = "get";
export const PATH = "/hello";

export const handler = async (req: express.Request, res: express.Response) => {
  res.send("Hello");
};
