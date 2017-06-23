export function convert(value: any, name: string = ''): string {
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

export function convertObject(obj: Object, name: string = ''): string {
  return '';
}

export function convertArray(array: Array<any>, name: string = ''): string {
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

export function insertArrayPrefix(text: string): string {
  const lines = text.split(/\r\n|\r|\n/);
  return lines.map((line, index) => {
    if (index === 0) {
      return '├── ' + line;
    } else {
      return '│   ' + line;
    }
  }).join("\n");
}

export function insertLastArrayPrefix(text: string): string {
  const lines = text.split(/\r\n|\r|\n/);
  return lines.map((line, index) => {
    if (index === 0) {
      return '└── ' + line;
    } else {
      return '    ' + line;
    }
  }).join("\n");
}
