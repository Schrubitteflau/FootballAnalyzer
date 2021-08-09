import * as puppeteer from "puppeteer";

type Globals = {
    browser: puppeteer.Browser;
}

const globals = {} as Globals;

export default globals;