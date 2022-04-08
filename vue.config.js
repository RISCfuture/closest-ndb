const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {},
  },

  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/closest-ndb',
});
