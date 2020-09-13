import { Drash } from "./deps.ts";
import HomeResource from "./resources/home.resource.ts";
import HelpResource from "./resources/help.resource.tsx";

const server = new Drash.Http.Server({
  directory: Deno.realPathSync("./"),
  response_output: "text/html",
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: false,
    level: "debug",
  }),
  resources: [HomeResource, HelpResource],
  static_paths: ["/public"],
  views_path: "./views",
});

await server.run({
  hostname: "127.0.0.1",
  port: 1667,
});

console.log(`Server listening: http://${server.hostname}:${server.port}`);
