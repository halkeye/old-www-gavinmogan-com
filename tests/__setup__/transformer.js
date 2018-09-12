// test/transformer.js
module.exports = require('babel-jest').createTransformer({
  presets: ['@babel/react', '@babel/env'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    'remove-graphql-queries'
  ]
});
