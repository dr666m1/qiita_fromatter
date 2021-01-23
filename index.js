const { Parser } = require("node-sql-parser");
const parser = new Parser();
const {
  doc: {
    builders: { concat, hardline, group, indent, softline, join, line },
  },
  util,
} = require("prettier");

const languages = [
  {
    extensions: [".sql"],
    name: "sql",
    parsers: ["sql-parse"],
  },
];

const parsers = {
  "sql-parse": {
    parse: (text) => parser.astify(text),
    astFormat: "sql-ast",
  },
};

function printSQL(path, options, print) {
  const node = path.getValue(); // extract ast
  if (Array.isArray(node)) {
    return concat(path.map(print));
  }
  switch (node.type) {
    default:
      return concat([node.value.toString(), node.as ? ` AS ${node.as}` : ""]);
  }
}

const printers = {
  "sql-ast": {
    print: printSQL,
  },
};

module.exports = {
  languages,
  parsers,
  printers,
};
