const path = require('path');

module.exports = {
  "lintOnSave": false,
  "runtimeCompiler": true,
  filenameHashing: false,
  "configureWebpack": {
    /*
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            hotReload: true,
          }
        }
      ]
    },
    */
    "output": {
      "filename": 'app.js',
    },
    "optimization": {
      "splitChunks": false,
    },
    "resolve": {
      "alias": {
        "components": path.resolve(__dirname, "src/components"),
        "actions": path.resolve(__dirname, "src/store/actions"),
        "utils": path.resolve(__dirname, "src/utils"),
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}