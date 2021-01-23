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
  if (node.expr) {
    return path.call(print, "expr");
  }
  switch (node.type) {
    case "select":
      return concat([
        "SELECT",
        indent(
          concat([
            hardline,
            join(concat([hardline, ","]), path.map(print, "columns")),
          ])
        ),
        hardline,
        "FROM",
        indent(concat(node.from.map((x) => concat([hardline, x.table])))),
      ]);
    case "column_ref":
      return node.column;
    default:
      return "";
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
