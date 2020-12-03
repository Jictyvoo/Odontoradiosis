// Import the ServeTypeScript middleware function
import { ServeTypeScript } from "../deps.ts";

// Instantiate ServeTypeScript and pass in the files you want compiled during
// compile time. The compiled output of these files will be used during runtime.
const serveCompiledTs = ServeTypeScript({
  files: [
    {
      source: Deno.realPathSync("./resources/landmark_system/main.ts"), // the path to the actual TypeScript file
      target: "/ts/landmark_system.min.ts", // the URI this file is accessible at (e.g., localhost:1447/ts/my_ts.ts)
    },
  ],
});

export { serveCompiledTs };
