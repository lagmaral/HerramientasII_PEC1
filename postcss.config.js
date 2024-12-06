// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-nested'),        // Para usar CSS nesting y @layer
    require('postcss-preset-env'),    // Para características de CSS más modernas (como container queries)
  ],
};
