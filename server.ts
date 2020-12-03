import { Drash } from "./deps.ts";
import HomeResource from "./resources/home_resource.ts";
import { serveCompiledTs } from "./middleware/TypeScriptCompiler.ts";

export const server = new Drash.Http.Server({
  directory: Deno.realPathSync("."),
  response_output: "text/html",
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: false,
    level: "debug",
  }),
  middleware: {
    compile_time: [serveCompiledTs],
  },
  resources: [HomeResource],
  static_paths: ["/public"],
  views_path: "./public/views",
});
