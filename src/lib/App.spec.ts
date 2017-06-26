///<reference types="node"/>

//import {IndexHTML} from "../App";

const IndexHTML = require('../App');
const assert = require('assert');

describe("App should be an object", ()=> {
    it('should be an object', ()=> {
        const result = new IndexHTML().run();
        assert.equal(result, 1);
    });
});