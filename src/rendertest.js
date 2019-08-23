#! /usr/bin/env node

const { readFileSync, writeFileSync, copyFileSync, copyFile } = require('fs')
const { resolve, basename, dirname, extname } = require('path')
const nunjucks = require('nunjucks')

const inputDir = './src'

// Read Context file
const context = JSON.parse(readFileSync('./input/InventoryList.xlsx.openapi.json', 'utf8'))
console.log(context)
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
/** @type {nunjucks.ConfigureOptions} */
const nunjucksOptions = { trimBlocks: true, lstripBlocks: true, noCache: true }

const nunjucksEnv = nunjucks.configure(inputDir, nunjucksOptions)
// Render Template
let res = nunjucksEnv.render('columnDefs.js.njk', context);
console.log(res)

// Read Context file 
//const csvFilePath='./input/data/InventoryListTable.data.csv'
const csvFilePath='./input/data/InventoryList.csv'

const csv=require('csvtojson')
const context1 = {}
// Async / await usage
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    context1.rowData = jsonObj
    //console.log(jsonObj);
    res = nunjucksEnv.render('rowData.js.njk', context1);
    console.log(res)
})
//*/
//const jsonArray = csv().fromFile(csvFilePath);
//context1.rowData = jsonArray.result
//console.log(context1)
