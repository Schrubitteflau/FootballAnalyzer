import Globals from "../Globals";
import { Match } from "./Components";

import * as puppeteer from "puppeteer";

export default class MatchInspector
{
    private readonly matchID: string;
    private page: puppeteer.Page;

    private constructor(matchID: string, page: puppeteer.Page)
    {
        this.matchID = matchID;

        this.page = page;
    }

    // Wrapper qui instancie un MatchInspector
    public static async Build(matchID: string)
    {
        const page: puppeteer.Page = await Globals.browser.newPage();
        const matchURL = MatchInspector.GenerateMatchURL(matchID);

        console.log(`Loading page ${matchURL}...`);
        await page.goto(matchURL);
        console.log("Page loaded !");

        return new MatchInspector(matchID, page);
    }

    private static GenerateMatchURL(matchID: string)
    {
        return `https://www.flashscore.fr/match/${matchID}/`;
    }

    public match()
    {
        return new Match(this.page);
    }
}