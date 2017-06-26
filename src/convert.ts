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

export function convertObject(obj: object, name: string = ''): string {
  const properties = Object.keys(obj).map((name, index) => {
    const value = (obj as any)[name];
    return convert(value, name);
  });
  const content = properties.join("\n");
  return encloseText(content, name);
}

export function encloseText(text: string, name: string = ''): string {
  const lines = text.split(/\r\n|\r|\n/);
  const maxLength = lines.reduce((length, line) => {
    if (line.length > length) {
      return line.length
    } else {
      return length
    }
  }, name.length);

  const upperSpaceLength = maxLength - name.length + 2;
  const upperFrame = name + ' ' + '─'.repeat(upperSpaceLength) + '┐';
  const enclosedLines = lines.map((line) => {
    const spaceLength = maxLength - line.length;
    return '│ ' + line + ' '.repeat(spaceLength) + ' │';
  });
  const lowerFrame = '└' + '─'.repeat(maxLength + 2) + '┘';

  return upperFrame + "\n"
       + enclosedLines.join("\n") + "\n"
       + lowerFrame;
}

export function convertArray(array: Array<any>, name: string = ''): string {
  const convertedArray = array.map((value, index) => {
    const converted = convert(value, `[${index}]`);
    if (index === array.length - 1) {
      return insertLastArrayPrefix(converted);
    } else {
      return appendArrayPrefix(converted);
    }
  }).join("\n");
  return name + "\n" + convertedArray;
}

export function appendArrayPrefix(text: string): string {
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
