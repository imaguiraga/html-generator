#! /usr/bin/env node

const { readFileSync, writeFileSync, copyFileSync, copyFile } = require('fs')
const { resolve, basename, dirname, extname } = require('path')
const nunjucks = require('nunjucks')

const inputDir = './src'

// Read Context file
let definition = JSON.parse(readFileSync('./input/InventoryList.xlsx.openapi.json', 'utf8'))

// Expose environment variables to render context
/*
context.env = process.env
for(let i in context.schemas){
    let obj = context.schemas[i];
    console.log(obj)  
    for(let [key, value] of Object.entries(obj.properties)){
        console.log(`${key}: ${value}`);
        console.log(value.title); 
        //console.log(obj.properties[key]); 
    }
}
/*
for (let [key, value] of Object.entries(context.schemas)) {
    console.log(`${key}: ${value}`);
}
//*/
function format(value){
    if(value){     
        if((typeof value) === 'string'){
            if(isNaN(value) === true){
                return `"${value}"`;
            }
        } 
        return value;
    
    } else {
        return "null";
    }
}
/** @type {nunjucks.ConfigureOptions} */
const nunjucksOptions = { trimBlocks: true, lstripBlocks: true, noCache: true, autoescape: false }
const nunjucksEnv = nunjucks.configure(inputDir, nunjucksOptions)

const csv2json = require('csvjson-csv2json');

function render(){
    const csvFilePath='./input/data/InventoryList.csv'
    let results = csv2json(readFileSync(csvFilePath, 'utf8'));
    let context = {}
    context.format = format;
    context.rowData = results;
    console.log('rowData');
    let res = nunjucksEnv.render('rowData.js.njk', context);
    console.log(res)
}

render();
// Render Template
console.log('columnDefs');
for(let [key, schema] of Object.entries(definition.schemas)){
    let context = {}
    context.name = key;
    context.schema = schema;
    // Enclose string with ""
    context.format = format;
    let res = nunjucksEnv.render('columnDefs.js.njk', context);
    console.log(res)
}


