import path from "path";
import cssnao from "cssnano";
import autoprefixer from "autoprefixer";
import alias from "@rollup/plugin-alias";
import postcss from "rollup-plugin-postcss";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const plugins = [
  terser(),
  // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
  commonjs(),
  // 配合 commonjs 解析第三方模块
  nodeResolve(),
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
      },
      include: ["src/**/*"],
      exclude: ["node_modules"],
    },
    abortOnError: false,
  }),
  // 设置路径别名
  alias({
    entries: [{ find: "@", replacement: "../src/" }],
  }),
  postcss({
    plugins: [autoprefixer, cssnao],
    extract: "css/core.css",
    extensions: [".scss", ".css"],
  }),
  babel({
    babelHelpers: "runtime",
    // 只转换源代码，不运行外部依赖
    exclude: "node_modules/**",
    // babel 默认不支持 ts 需要手动添加
    extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
  }),
];
// 定义外部依赖，不打包
const external = ["axios", "lodash", "vue"];
const globals = {
  axios: "axios",
  vue: "Vue",
  qs: "qs",
};

const resolvePath = function (pathStr) {
  return path.resolve(__dirname, pathStr);
};

export { external, plugins, globals, resolvePath };
