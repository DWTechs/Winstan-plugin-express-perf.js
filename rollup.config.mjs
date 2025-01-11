const config =  {
  input: "build/es6/winstan-plugin-express-perf.js",
  output: {
    name: "winstan",
    file: "build/winstan-plugin-express-perf.mjs",
    format: "es"
  },
  external: [
    "@dwtechs/winstan",
  ],
  plugins: []
};

export default config;
