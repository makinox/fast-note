/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: true,
  singleQuote: true,
  printWidth: 150,
};

module.exports = config;
