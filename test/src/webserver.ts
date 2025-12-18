import express from "express";

const app = express();

export function startWebserver() {
  app.get("/", (req, res) => {
    res.send(`
    <html>
      <body>
        <h1 class='pageTitle'>Test</h1>
      </body>
    </html>
`);
  });

  return new Promise<void>((resolve) => {
    app.listen(8080, () => {
      console.log("Server started on port 8080");
      resolve();
    });
  });
}
