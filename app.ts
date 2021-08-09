import { Crawler } from "./src";

import * as puppeteer from "puppeteer";


(async () =>
{
    console.log("Starting browser...");
    Crawler.Globals.browser = await puppeteer.launch({ headless: false });
    console.log("Browser ready !");

    const inspector: Crawler.MatchInspector = await Crawler.MatchInspector.Build("nPWWUkTb");

    const possession = await inspector.match().possession();

    console.log(possession);
})();