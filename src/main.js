#! /usr/bin/env node

const { readFileSync, writeFileSync, copyFileSync, copyFile } = require('fs')
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


const inputDir = resolve(process.cwd(), argv.input) || ''
const outputDir = argv.out || ''

const context = argv._[1] ? JSON.parse(readFileSync(argv._[1], 'utf8')) : {}
// Expose environment variables to render context
context.env = process.env

/** @type {nunjucks.ConfigureOptions} */
const nunjucksOptions = argv.options
	? JSON.parse(readFileSync(argv.options, 'utf8'))
	: { trimBlocks: true, lstripBlocks: true, noCache: true }

const nunjucksEnv = nunjucks.configure(inputDir, nunjucksOptions)

const render = (/** @type {string[]} */ files) => {
	for (const file of files) {
		// No performance benefits in async rendering
		// https://mozilla.github.io/nunjucks/api.html#asynchronous-support
		const res = nunjucksEnv.render(file, context)
		// Strip file extension
		let outputFile = file.substring(0,file.indexOf(extname(file)));

		if (outputDir) {
			outputFile = resolve(outputDir, outputFile)
			mkdirp.sync(dirname(outputFile))
		}

		console.log(chalk.blue('Rendering: ' + file))
		writeFileSync(outputFile, res)
	}
}

const copy = (/** @type {string[]} */ files) => {
	for (const file of files) {
		// No performance benefits in async rendering

        let target = file
        let source = resolve(inputDir,file)
        
		if (outputDir) {
			target = resolve(outputDir, target)
			mkdirp.sync(dirname(target))
		}

		console.log(chalk.green('Copying: ' + file + ' -> '+target))
		copyFileSync(source,target)
	}
}


/** @type {glob.IOptions} */
const globOptions1 = { 
	strict: true, 
	cwd: inputDir, 
	ignore: ['**/_*.*','**/node_modules/**','package-lock.json'], 
	nonull: true, 
	nodir: true,
	nobrace: false 
}

// Comma separated list of extensions
const filter = `**/*.njk`;
// Render the files given a glob pattern (except the ones starting with "_")
glob(filter, globOptions1, (err, files) => {
	if (err){ 
		return console.error(chalk.red(err))
	}
	render(files)
})

const globOptions2 = { 
	strict: true, 
	cwd: inputDir, 
	ignore: [filter,'**/node_modules/**','package-lock.json'], 
	nonull: true, 
	nodir: true,
	nobrace: false 
}
// Copy the files given a glob pattern (except the ones starting with "_")
glob('**/*', globOptions2, (err, files) => {
	if (err){ 
		return console.error(chalk.red(err))
	}
	copy(files)
})

