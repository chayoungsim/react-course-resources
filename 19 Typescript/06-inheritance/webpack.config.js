const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // 개발 모드로 설정
  mode: "development",
  // 시작점 파일
  entry: "./src/app.ts",
  // 번들된 파일의 출력 설정
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  // 개발 서버 설정
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new Dotenv()],
};
