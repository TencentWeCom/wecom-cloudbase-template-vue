const fs = require('fs');
const path = require('path');
const { parse } = require('envfile');

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => ['ww-open-data'].includes(tag),
        };
        return options;
      });
  },
};
