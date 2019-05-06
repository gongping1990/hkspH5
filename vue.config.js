module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "./src/assets/style/varibles.scss";`
      },
      stylus: {
        "resolve url": true,
        import: ["./src/theme"]
      }
    }
  },

  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: true
    }
  }
};
