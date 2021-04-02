module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: (tag) => ['ww-open-data'].includes(tag),
        };
        return options;
      });
  },
  devServer: {
    proxy: 'https://wwservicedemo-4g35adwod8b7532f-1253481040.tcloudbaseapp.com/',
  },
};
