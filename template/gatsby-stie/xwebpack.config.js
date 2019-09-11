const path = require('path');

const config = 
  {
    // Here you can custom webpack configurations
    entry: {
      main: './src/index.js',
      aggrid: './component/aggrid/src/index.js',
      carbon: './component/carbon/src/index.js',
      material: './component/material/src/index.js',
      patternfly: './component/patternfly/src/index.js',
      pivotal: './component/pivotal/src/index.js',
      uifabric: './component/uifabric/src/index.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: __dirname + '/build/static/js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
            }
          },
          exclude: /node_modules/,         
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(ts|tsx)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.svg$/,
          use: 'file-loader'
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: 'url-loader'
        }
      ]
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.tsx',
        '.ts'
      ]
    }
  }
  
  module.exports = config;