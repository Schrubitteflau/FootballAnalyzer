import * as puppeteer from "puppeteer";

import AbstractComponent from "./AbstractComponent";

/* Ce composant permet de récupérer des informations concernant les statistiques générales concernant le match,
comme le score, les équipes, les compositions, les statistiques, etc. */
export default class Match extends AbstractComponent
{
    public constructor(page: puppeteer.Page)
    {
        super(page);
    }

    public async possession(): Promise<any>
    {
        const possessionElementID: string = "tab-statistics-0-statistic";

        await this.openTab("statistics");

        const element = await this.page.$(`#${possessionElementID}`);

        if (element === null)
        {
            throw new Error(`Unable to get element #${possessionElementID}`);
        }

        const textContent = await this.page.evaluate(element => element.textContent, element);

        return textContent;
    }
}