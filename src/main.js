#! /usr/bin/env node

const { readFileSync, writeFileSync, copyFileSync } = require('fs')
const { resolve, basename, dirname, extname } = require('path')
const nunjucks = require('nunjucks')
const glob = require('glob')
const mkdirp = require('mkdirp')
const chalk = require('chalk').default
const csv2json = require('csvjson-csv2json');

const { argv } = require('yargs')
	.usage('Usage: nunjucks -i<openapi schema location> -o <destination>')
	.example('nunjucks -i src -o dist', 'Compile *.njk files in ./src, compile them to ./dist')
	.epilogue('For more information on Nunjucks: https://mozilla.github.io/nunjucks/')
	.help()
	.alias('help', 'h')
	.locale('en')
	.version(false)
	.option('input', {
		alias: 'i',
		string: true,
		requiresArg: true,
		nargs: 1,
		default: 'input',
		describe: 'Path where openapi schema ',
	})
	.option('out', {
		alias: 'o',
		string: true,
		requiresArg: true,
		nargs: 1,
		default: 'output',
		describe: 'Output folder',
	})


const render = (
	/** @type {string[]} */ files, 
	/** @type {Object} */ context, 
	/** @type {string} */ templateDir, 
	/** @type {string} */ inputDir, 
	/** @type {string} */ outputDir
 ) => {

	/** @type {nunjucks.ConfigureOptions} */
	const nunjucksOptions = { 
		trimBlocks: true, 
		lstripBlocks: true, 
		noCache: true, 
		autoescape: false 
	}

	/** @type {nunjucks.Environment} */
	const nunjucksEnv = nunjucks.configure(templateDir, nunjucksOptions)

	for (const file of files) {
		const res = nunjucksEnv.render(file, context)
		// Remove Template file extension
		let outputFile = file.substring(0,file.indexOf(extname(file)));

		if (outputDir) {
			outputFile = resolve(outputDir, outputFile)
			mkdirp.sync(dirname(outputFile))
		}

		console.log(chalk.blue('Rendering: ' + file))
		writeFileSync(outputFile, res)
	}
}

const copy = (
	/** @type {string[]} */ files, 
	/** @type {Object} */ context, 
	/** @type {string} */ templateDir, 
	/** @type {string} */ inputDir, 
	/** @type {string} */ outputDir
 ) => {
	for (const file of files) {
		// No performance benefits in async rendering

        let target = file
        let source = resolve(templateDir,file)
        
		if (outputDir) {
			target = resolve(outputDir, target)
			mkdirp.sync(dirname(target))
		}

		console.log(chalk.green('Copying: ' + file + ' -> '+target))
		copyFileSync(source,target)
	}
}

function _renderFiles(
	/** @type {string} */ filter, 
	/** @type {Object} */ context, 
	/** @type {string} */ templateDir, 
	/** @type {string} */ inputDir, 
	/** @type {string} */ outputDir
	) {
	/** @type {glob.IOptions} */
	const globOptions = { 
		strict: true, 
		cwd: templateDir, 
		ignore: ['**/_*.*','**/node_modules/**','package-lock.json','yarn.lock'], 
		nonull: true, 
		nodir: true,
		nobrace: false,
		dot: true 
	}

	// Render the files given a glob pattern (except the ones starting with "_")
	glob(filter, globOptions, (err, files) => {
		if (err){ 
			return console.error(chalk.red(err))
		}
		render(files,context,templateDir,inputDir,outputDir)
	})
}

function copyFiles(
	/** @type {string} */ filter, 
	/** @type {Object} */ context, 
	/** @type {string} */ templateDir, 
	/** @type {string} */ inputDir, 
	/** @type {string} */ outputDir
	) {
	/** @type {glob.IOptions} */
	const globOptions = { 
		strict: true, 
		cwd: templateDir, 
		ignore: [filter,'**/node_modules/**','package-lock.json','yarn.lock'], 
		nonull: true, 
		nodir: true,
		nobrace: false ,
		dot: true
	}
	// Copy the files given a glob pattern (except the ones starting with "_")
	glob('**/*', globOptions, (err, files) => {
		if (err){ 
			return console.error(chalk.red(err))
		}
		copy(files,context,templateDir,inputDir,outputDir)
	})
}
// Enclose string with ""
function format(value) {
	if(value){     
		if((typeof value) === 'string'){
			if(isNaN(value) === true){
				return `'${value}'`;
			}
		} 
		return value;
	
	} else {
		return "null";
	}
};

function createContexts(/** @type {string[]} */files){
	let contexts = [] 
	for (const file of files) {
		// Parse openapi schema definition
		let definition = JSON.parse(readFileSync(resolve(inputDir, file), 'utf8'));
		// Create nunjuck context from schemas objects
		for(let [key, schema] of Object.entries(definition.schemas)){
			let context = {}
			context.name = key;
			context.schema = schema;
			console.log(`${key}: ${schema}`);
			// Parse data file if exists
			if(schema['x-json-data']){
				let datafile = schema['x-json-data'];
				context.rowData = JSON.parse(readFileSync(resolve(inputDir, datafile), 'utf8'));

			} else if(schema['x-csv-data']){
				let datafile = schema['x-csv-data'];
				// Convert csv to json
				context.rowData = csv2json(readFileSync(resolve(inputDir, datafile), 'utf8'));
			}
			// @TODO read css file
			// Enclose string with ""
			context.format = (value) => {
				if(value){     
					if((typeof value) === 'string'){
						if(isNaN(value) === true){
							return `'${value}'`;
						}
					} 
					return value;
				
				} else {
					return "null";
				}
			};
			// Append to contexts list
			contexts.push(context);
		}

	}
	return contexts;
}

function renderFiles(
	/** @type {string} */ filter, 
	/** @type {string} */ templateDir, 
	/** @type {string} */ inputDir, 
	/** @type {string} */ outputDir
	) {
	/** @type {Object[]} */
	let contexts = [] 
	/** @type {glob.IOptions} */
	const globOptions = { 
		strict: true, 
		cwd: inputDir, 
		nonull: true, 
		nodir: true,
		nobrace: false 
	}

	let pattern = '**/*.openapi.json';
	// Copy the files given a glob pattern (except the ones starting with "_")
	glob(pattern, globOptions, (err, files) => {
	
		if (err){ 
			return console.error(chalk.red(err))
		}
		contexts = createContexts(files);
		contexts.forEach((/** @type {Object} */ context) => {	
			// Comma separated list of extensions	
			_renderFiles(filter,context,templateDir,inputDir,outputDir)
		})
		
	})

	return contexts
}

// Run process
const templateDir = 'template'
const inputDir = resolve(process.cwd(), argv.input) || ''
const outputDir = argv.out || ''

// Read each context files
// Process all the contexts
const filter = '**/*.njk';
copyFiles(filter,null,templateDir,inputDir,outputDir)
renderFiles(filter,templateDir,inputDir,outputDir)
