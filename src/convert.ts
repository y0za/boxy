export function insertArrayPrefix(text: String): String {
  const lines = text.split(/\r\n|\r|\n/)
  return lines.map((line, index) => {
    if (index === 0) {
      return '├-- ' + line;
    } else {
      return '|   ' + line;
    }
  }).join("\n");
}

export function insertLastArrayPrefix(text: String): String {
  const lines = text.split(/\r\n|\r|\n/)
  return lines.map((line, index) => {
    if (index === 0) {
      return '└-- ' + line;
    } else {
      return '    ' + line;
    }
  }).join("\n");
}
