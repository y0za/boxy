#!/usr/bin/env node

import program = require('commander');
import fs = require('fs');
import { convert } from './convert';

function cli(args: Array<string>): number {
  if (args.length === 0) {
    console.error('No JSON file path.');
    return 1;
  }

  const path = args[0];
  if (!fs.existsSync(path)) {
    console.error('Not found JSON file.');
    return 1;
  }
  try {
    const jsonText = fs.readFileSync(path);
    const json = JSON.parse(jsonText.toString());
    const box = convert(json);
    console.log(box);
  } catch (err) {
    console.error(err.message);
    return 1;
  }
  return 0;
}

program
  .version('0.0.1')
  .usage('<file>')
  .parse(process.argv);

const status = cli(program.args);
process.exit(status);
