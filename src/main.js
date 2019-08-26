#! /usr/bin/env node

const { readFileSync, writeFileSync, copyFileSync } = require('fs')
const { resolve, basename, dirname, extname } = require('path')
const nunjucks = require('nunjucks')
const glob = require('glob')
const mkdirp = require('mkdirp')
const chalk = require('chalk').default

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

function renderFiles(
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
		ignore: ['**/_*.*','**/node_modules/**','package-lock.json'], 
		nonull: true, 
		nodir: true,
		nobrace: false 
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
		ignore: [filter,'**/node_modules/**','package-lock.json'], 
		nonull: true, 
		nodir: true,
		nobrace: false 
	}
	// Copy the files given a glob pattern (except the ones starting with "_")
	glob('**/*', globOptions, (err, files) => {
		if (err){ 
			return console.error(chalk.red(err))
		}
		copy(files,context,templateDir,inputDir,outputDir)
	})
}

function getContexts(/** @type {string} */ inputDir) {
	let contexts = [] 
	/** @type {glob.IOptions} */
	const globOptions = { 
		strict: true, 
		cwd: inputDir, 
		nonull: true, 
		nodir: true,
		nobrace: false 
	}
	// Copy the files given a glob pattern (except the ones starting with "_")
	glob('**/*.openapi.json', globOptions, (err, files) => {
		if (err){ 
			return console.error(chalk.red(err))
		}
		let context = JSON.parse(readFileSync(argv._[1], 'utf8'));
		// TODO read csv file 
		// TODO read css file
		contexts.push(context);
	})

	return contexts
}

// Run process
const templateDir = 'template'
const inputDir = resolve(process.cwd(), argv.input) || ''
const outputDir = argv.out || ''

// Read each context files
/** @type {Object[]} */
const contexts = getContexts(inputDir)
// Process all the contexts
contexts.forEach((/** @type {Object} */ context) => {	
	// Comma separated list of extensions
	const filter = '**/*.njk';
	copyFiles(filter,context,templateDir,inputDir,outputDir)
	renderFiles(filter,context,templateDir,inputDir,outputDir)
})
