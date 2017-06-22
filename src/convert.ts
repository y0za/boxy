export function convert(value: any, name: String = ''): String {
  if (Array.isArray(value)) {
    return convertArray(value as Array<any>, name);
  } else if (typeof value === 'object' && value !== null) {
    return convertObject(value, name);
  }

  if (name === '') {
    return String(value);
  } else {
    return name + ': ' + String(value);
  }
}

export function convertObject(obj: Object, name: String = ''): String {
  return '';
}

export function convertArray(array: Array<any>, name: String = ''): String {
  const convertedArray = array.map((value, index) => {
    const converted = convert(value, `[${index}]`);
    if (index === array.length - 1) {
      return insertLastArrayPrefix(converted);
    } else {
      return insertArrayPrefix(converted);
    }
  }).join("\n");
  return name + "\n" + convertedArray;
}

export function insertArrayPrefix(text: String): String {
  const lines = text.split(/\r\n|\r|\n/);
  return lines.map((line, index) => {
    if (index === 0) {
      return '├── ' + line;
    } else {
      return '│   ' + line;
    }
  }).join("\n");
}

export function insertLastArrayPrefix(text: String): String {
  const lines = text.split(/\r\n|\r|\n/);
  return lines.map((line, index) => {
    if (index === 0) {
      return '└── ' + line;
    } else {
      return '    ' + line;
    }
  }).join("\n");
}
