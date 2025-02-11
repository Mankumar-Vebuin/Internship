import http from "http";
import https from "https";

const port = 3000;

const fetchDataFromAPI = (apiUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    https
      .get(apiUrl, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err.message);
      });
  });
};

const server = http.createServer(
  async (
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): Promise<void> => {
    const apiUrl = "https://google.com";
    try {
      const apiResponse = await fetchDataFromAPI(apiUrl);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(apiResponse);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end(`Error fetching API data: ${error}`);
    }
  }
);

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
