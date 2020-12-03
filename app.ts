import { server } from "./server.ts";

await server.run({
  hostname: "127.0.0.1",
  port: 1667,
});

console.log(`Server listening: http://${server.hostname}:${server.port}`);
