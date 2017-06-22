/**
 * Note this was super weird and threw me off for a long time, but it's how WebPack works.
 * Want an external stylesheet? We've got to import it into our entry point
 */
import './app.scss';
import * as $ from 'jquery';
import {developers} from "./lib/Developers";

/**
 * I added jQuery just for funzies to show you how you'd do it, but I really don't want to use it
 */
console.log($);

class IndexHTML {
    data: Array<string>;
    element: HTMLElement;

    constructor() {
        this.data = developers;
        this.element = <HTMLElement>document.getElementsByTagName("ul")[0];
    }

    run() {
        for (let developer of this.data) {
            this.element.innerHTML += `<li id='${developer.toLowerCase()}'>${developer}</li>`;
        }
    }
}

new IndexHTML().run();