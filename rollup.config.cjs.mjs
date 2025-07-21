const config =  {
  input: "build/es6/winstan-plugin-express-perf.js",
  output: {
    file: "build/winstan-plugin-express-perf.js",
    format: "cjs"
  },
  external: [
    "@dwtechs/winstan",
  ],
  plugins: []
};

export default config;