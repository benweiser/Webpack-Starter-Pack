/**
 * Note this was super weird and threw me off for a long time, but it's how WebPack works.
 * Want an external stylesheet? We've got to import it into our entry point
 */
import './app.scss';



//import {MomentLongDateFormat} from 'moment';
import * as $ from 'jquery';
import {developers} from "./lib/Developers";

//console.log($);

class IndexHTML {
    data: Array<string>;
    element: HTMLElement;

    constructor() {
        this.data = developers;
        this.element = <HTMLElement>document.getElementsByTagName("ul")[0];
    }

    run() {
        for (let developer of this.data) {
            console.log(developer);
            this.element.innerHTML += `<li="${developer}">${developer}</li>`;
        }
    }
}

new IndexHTML().run();