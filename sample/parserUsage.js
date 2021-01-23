const { Parser } = require("node-sql-parser");
const parser = new Parser();
const ast = parser.astify("select c1,c2,c3 from data")
console.log(ast)
/*
{
  with: null,
  type: 'select',
  options: null,
  distinct: null,
  columns: [
    { expr: [Object], as: null },
    { expr: [Object], as: null },
    { expr: [Object], as: null }
  ],
  from: [ { db: null, table: 'data', as: null } ],
  where: null,
  groupby: null,
  having: null,
  orderby: null,
  limit: null,
  for_update: null
}
*/
