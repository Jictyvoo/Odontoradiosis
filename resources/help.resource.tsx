import { Drash } from "../deps.ts";
import { React } from "../deps.ts";
import { ReactDOMServer } from "../deps.ts";
import HelpPage from "../views/Help.jsx";
import Sidebar from "../views/components/Sidebar.tsx";

export default class HelpResource extends Drash.Http.Resource {
  static paths = ["/help"];

  public GET() {
    this.response.body = (ReactDOMServer as any).renderToString(
      <Sidebar>
        <HelpPage />
      </Sidebar>
    );
    return this.response;
  }

  public POST() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public DELETE() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public PUT() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }
}
