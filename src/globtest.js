const glob = require('glob')
const path = require('path')
const chalk = require('chalk').default
const { readFileSync, writeFileSync, copyFileSync, copyFile } = require('fs')
const { resolve, basename, dirname } = require('path')
const mkdirp = require('mkdirp')

let inputDir = 'template'
let outputDir = 'output'

const copy = (/** @type {string[]} */ files) => {
	for (const file of files) {
		// No performance benefits in async rendering

        let target = file.substring(0,file.indexOf(path.extname(file)));
        let source = resolve(inputDir,file)
        
		if (outputDir) {
			target = resolve(outputDir, target)
			mkdirp.sync(dirname(target))
		}

        //strip the exension
		console.log(chalk.green('Copying: ' + file + ' -> '+target))
		copyFileSync(source,target)
	}
}

/** @type {glob.IOptions} */
const globOptions = { strict: true, cwd: inputDir, ignore: ['**/_*.*','**/node_modules/**','package-lock.json'], nonull: true, nodir:true }

// Render the files given a glob pattern (except the ones starting with "_")
glob('**/*.{png,tsx}' , globOptions, (err, files) => {
	if (err){ 
		return console.error(chalk.red(err))
	}
    copy(files)
})