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
  const innerWidth = lines.reduce((length, line) => {
    if (line.length > length) {
      return line.length
    } else {
      return length
    }
  }, name.length);

  const width = innerWidth + 4;
  const upperFrame = createUpperFrame(width, name);
  const enclosedLines = lines.map((line) => {
    const spaceLength = innerWidth - line.length;
    return '│ ' + line + ' '.repeat(spaceLength) + ' │';
  });
  const lowerFrame = '└' + '─'.repeat(width - 2) + '┘';

  return upperFrame + "\n"
       + enclosedLines.join("\n") + "\n"
       + lowerFrame;
}

export function createUpperFrame(width: number, name: string = ''): string {
  if (name === '') {
    const edgeLength = width - 2;
    return '┌' + '─'.repeat(edgeLength) + '┐';
  } else {
    const edgeLength = width - name.length - 2;
    return name + ' ' + '─'.repeat(edgeLength) + '┐';
  }
}

export function convertArray(array: Array<any>, name: string = ''): string {
  if (array.length === 0) {
    return name + ': []';
  }
  const convertedArray = array.map((value, index) => {
    const converted = convert(value, `[${index}]`);
    if (index === array.length - 1) {
      return appendLastArrayPrefix(converted);
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

export function appendLastArrayPrefix(text: string): string {
  const lines = text.split(/\r\n|\r|\n/);
  return lines.map((line, index) => {
    if (index === 0) {
      return '└── ' + line;
    } else {
      return '    ' + line;
    }
  }).join("\n");
}
