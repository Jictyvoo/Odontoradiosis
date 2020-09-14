/**
 * Drash server
 */
export { Drash } from "https://deno.land/x/drash@v1.2.2/mod.ts";
export { assertEquals } from "https://deno.land/std@0.63.0/testing/asserts.ts";

import { IReact } from "./util/interfaces.ts";
/**
 * React Library
 */
import { default as ImportedReact } from "https://dev.jspm.io/react@16.13.1";
export const React = ImportedReact as IReact;

export { default as ReactDOMServer } from "https://dev.jspm.io/react-dom@16.13.1/server";

/**
 * React-JSS
 */
export { default as ReactJSS } from "https://dev.jspm.io/react-jss";

/**
 * Material-UI
 * export * as MaterialUI from "https://unpkg.com/@material-ui/core@4.11.0/umd/material-ui.production.min.js";
 */
