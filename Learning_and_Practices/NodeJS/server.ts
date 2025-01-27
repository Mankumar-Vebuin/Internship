import http from "http";

const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("This and That\n");
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});


