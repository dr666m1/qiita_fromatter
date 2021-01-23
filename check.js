const prettier = require("prettier");
const format = (code) => {
  const res = prettier.format(code, {
    parser: "sql-parse",
    plugins: ["."],
  });
  return res;
};

console.log(format("select c1,c2,c3 from data"));

/*
SELECT
  c1
  ,c2
  ,c3
FROM
  data
 */
