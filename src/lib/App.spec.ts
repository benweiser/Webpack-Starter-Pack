//const IndexHTML = require('../App');
import {hello, IndexHTML, TestClass} from "../App";
const assert = require('assert');
const jsdom = require('mocha-jsdom');
const expect = require('chai').expect;


describe('mocha tests', ()=> {
    jsdom();
    it('has document', ()=> {
        let div = document.createElement('div');
        expect(div.nodeName).eql('DIV');
        console.log(document);
    });
});

describe('combine names', ()=>{
   it('combines names', ()=>{

   });
});

describe('Hello function', ()=>{
    it('should return hello world', ()=>{
        const result = new IndexHTML();
        expect(result).to.be.an('object');

    });
});

