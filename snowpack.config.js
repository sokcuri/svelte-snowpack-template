const path = require('path');

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-sass',
    '@snowpack/plugin-babel',
    ['@snowpack/plugin-webpack', {
      outputPattern: {
        js: "index.js",
        css: "index.css",
      },
      extendConfig: config => {
        delete config.optimization.splitChunks;
        delete config.optimization.runtimeChunk;
        config.module.rules[0] = {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { presets: ['@babel/preset-env'] }
            },
            {
              loader: path.resolve(__dirname, './node_modules/@snowpack/plugin-webpack/plugins/import-meta-fix.js')
            }
          ]
        }
        return config;
      }
    }]
  ],
  alias: {
    '~': './src',
    '@': './src'
  },
  knownEntrypoints: [],
  packageOptions: {},
  devOptions: {
    output: 'stream'
    // open: 'none'
  },
  buildOptions: {},
};
