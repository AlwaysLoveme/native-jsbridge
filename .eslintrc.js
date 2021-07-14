const eslintrc = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    "sort-vars": 0, //变量声明时排序
    eqeqeq: 0, //必须使用全等
    "valid-typeof": 2, //必须使用合法的typeof的值
    "space-after-keywords": [0, "always"], //关键字后面是否要空一格
    "@typescript-eslint/no-explicit-any": "off",
    "quote-props": [0, "always"], //对象字面量中的属性名是否强制双引号
    semi: [2, "always"], //语句强制分号结尾
    "semi-spacing": [0, { before: false, after: true }], //分号前后空格
    "key-spacing": [0, { beforeColon: false, afterColon: true }], //对象字面量中冒号的前后空格
    "@typescript-eslint/explicit-module-boundary-types": "off",
  }, // 自定义
};

module.exports = eslintrc;
