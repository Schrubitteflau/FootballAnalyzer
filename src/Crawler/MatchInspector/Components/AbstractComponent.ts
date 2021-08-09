import * as puppeteer from "puppeteer";

export type MatchTab =
    "summary" |
    "statistics"
;

export default abstract class AbstractComponent
{
    protected readonly page: puppeteer.Page;

    protected constructor(page: puppeteer.Page)
    {
        this.page = page;
    }

    protected async openTab(tabName: MatchTab)
    {
        // Fonction appellée dans le contexte du navigateur
        this.page.evaluate((args) =>
        {
            // Code navigateur
            return new Promise<void>((resolve, reject) =>
            {
                const tabName = args.tabName;
                const tab = detail_tabs.tabs[`tab_${tabName}`];
                const $tabContentElt = document.querySelector(`#content-all #tab-match-${tabName} #${tabName}-content`);

                function isTabContentLoaded()
                {
                    return ($tabContentElt?.innerHTML !== "");
                }

                // On ouvre le volet
                detail_tab(tabName);

                setInterval(function()
                {
                    if (isTabContentLoaded())
                    {
                        console.log(document.getElementById("tab-statistics-0-statistic"));
                        resolve();
                    }
                }, 50);
 
            });

        }, { tabName });
    }
}

/** Variables et fonctions pour ne pas avoir d'erreur TypeScript lors de l'utilisation de page.evaluate() **/
function detail_tab(...args: any) {}

const detail_tabs: any = null;