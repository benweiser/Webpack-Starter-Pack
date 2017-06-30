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

export class IndexHTML {
    data: Array<string>;
    element: Element;

    constructor() {
        this.data = developers;
        this.element = document.getElementsByTagName("ul")[0];
    }

    run() {
        for (let i = 0; i < this.data.length; i++) {
            let developer = this.data[i];
            this.element.innerHTML += `<li id='${developer.toLowerCase()}'>${developer}</li>`;
        }
    }
}

new IndexHTML().run();


export class TestClass {
    combineNames(first: string, last: string): string {
        return `${first} ${last}`;
    }
}

console.log(TestClass);

export function hello(){
    return 'Hello World';
}



