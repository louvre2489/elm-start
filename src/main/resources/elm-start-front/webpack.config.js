const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const glob = require('glob');

var MODE = process.env.npm_lifecycle_event === "prod" ? "production" : "development";

const elmBasePath = path.resolve(__dirname, 'src/elm');
const jsBasePath = path.resolve(__dirname, 'src/');
const elmCompileFolders = ['Example'];

const entries = {};

const elmTargets = glob.sync(`${elmBasePath}/+(${elmCompileFolders.join('|')})/*.elm`);
elmTargets.forEach(value => {
  const re = new RegExp(`${elmBasePath}/`);
  const key = value.replace(re, '');

  entries[key] = value;
});

const jsTargets = glob.sync(`${jsBasePath}/*.js`);
jsTargets.forEach(value => {
  const re = new RegExp(`${jsBasePath}/`);
  const key = value.replace(re, '');

  entries[key] = value;
});


// console.log(entries);

var common = {
  mode: MODE,

  entry: entries,

  // 出力の設定
  output: {
    // 出力するファイル名
    filename: '[name]',
    // 出力先のパス
    path: path.join(__dirname, 'public/js')
  },

  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".elm", ".scss", ".png"]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
};

if (MODE === "development") {
  console.log("Building for dev...");

  module.exports = merge(common, {
    plugins: [
      // Suggested for hot-loading
      new webpack.NamedModulesPlugin(),
      // Prevents compilation errors causing the hot loader to lose state
      new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            { loader: 'elm-hot-webpack-loader' },
            {
              loader: "elm-webpack-loader",
              options: {
                // add Elm's debug overlay to output
                debug: true,
                forceWatch: true,
              }
            }
          ]
        }
      ]
    },
    watch:true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      // ５秒毎にポーリング
      poll: 5000
    },
  });
}

if (MODE === "production") {

  console.log("Building for Production...");

  module.exports = merge(common, {
    plugins: [],
    module: {
      rules: []
    }
  });
}
