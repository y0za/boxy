import test from 'ava';

import {
  convert,
  convertArray,
  convertObject,
  encloseText,
  createUpperFrame,
  appendArrayPrefix,
  appendFirstArrayPrefix,
  appendLastArrayPrefix,
} from '../convert';

test('convert string value', (t) => {
  const value = 'bar';
  const name = 'foo';
  const expected = 'foo: bar';
  t.is(convert(value, name), expected);
});

test('convert string with empty name', (t) => {
  const value = 'bar';
  const expected = 'bar';
  t.is(convert(value), expected);
});

test('convert number value', (t) => {
  const value = 123;
  const name = 'foo';
  const expected = 'foo: 123';
  t.is(convert(value, name), expected);
});

test('convert null value', (t) => {
  const value = null;
  const name = 'foo';
  const expected = 'foo: null';
  t.is(convert(value, name), expected);
});

test('convert boolean value', (t) => {
  const value = true;
  const name = 'foo';
  const expected = 'foo: true';
  t.is(convert(value, name), expected);
});

test('convertObject empty object', (t) => {
  const obj = {};
  const name = 'foo';
  const expected = "foo ──┐\n│     │\n└─────┘";
  t.is(convertObject(obj, name), expected);
});

test('convertObject single property object', (t) => {
  const obj = { bar: 123 };
  const name = 'foo';
  const expected = "foo ───────┐\n│ bar: 123 │\n└──────────┘";
  t.is(convertObject(obj, name), expected);
});

test('encloseText empty text', (t) => {
  const text = '';
  const name = 'foo';
  const expected = "foo ──┐\n│     │\n└─────┘";
  t.is(encloseText(text, name), expected);
});

test('encloseText multiple lines text', (t) => {
  const text = "bar: 123\nbaz: 234";
  const name = 'foo';
  const expected = "foo ───────┐\n│ bar: 123 │\n│ baz: 234 │\n└──────────┘";
  t.is(encloseText(text, name), expected);
});

test('encloseText long name', (t) => {
  const text = 'bar: 123';
  const name = 'long long long name';
  const expected = "long long long name ──┐\n│ bar: 123            │\n└─────────────────────┘";
  t.is(encloseText(text, name), expected);
});

test('encloseText empty name', (t) => {
  const text = 'bar: 123';
  const name = '';
  const expected = "┌──────────┐\n│ bar: 123 │\n└──────────┘";
  t.is(encloseText(text, name), expected);
});

test('createUpperFrame empty name', (t) => {
  const width = 10;
  const name = '';
  const expected = '┌────────┐';
  t.is(createUpperFrame(width, name), expected);
});

test('createUpperFrame not empty name', (t) => {
  const width = 10;
  const name = 'foo';
  const expected = 'foo ─────┐';
  t.is(createUpperFrame(width, name), expected);
});

test('convertArray single item array', (t) => {
  const array = ['bar'];
  const name = 'foo';
  const expected = "foo\n└── [0]: bar";
  t.is(convertArray(array, name), expected);
});

test('convertArray multiple item array', (t) => {
  const array = ['bar', 'baz'];
  const name = 'foo';
  const expected = "foo\n├── [0]: bar\n└── [1]: baz";
  t.is(convertArray(array, name), expected);
});

test('convertArray no item array', (t) => {
  const array = new Array();
  const name = 'foo';
  const expected = 'foo: []';
  t.is(convertArray(array, name), expected);
});

test('appendArrayPrefix single line', (t) => {
  const text = 'foo';
  const expected = '├── foo';
  t.is(appendArrayPrefix(text), expected);
});

test('appendArrayPrefix multiple line', (t) => {
  const text = "foo\nbar";
  const expected = "├── foo\n│   bar";
  t.is(appendArrayPrefix(text), expected);
});

test('appendFirstArrayPrefix single line', (t) => {
  const text = 'foo';
  const expected = '┌── foo';
  t.is(appendFirstArrayPrefix(text), expected);
});

test('appendFirstArrayPrefix multiple line', (t) => {
  const text = "foo\nbar";
  const expected = "┌── foo\n│   bar";
  t.is(appendFirstArrayPrefix(text), expected);
});

test('appendLastArrayPrefix single line', (t) => {
  const text = 'foo';
  const expected = '└── foo';
  t.is(appendLastArrayPrefix(text), expected);
});

test('appendLastArrayPrefix multiple line', (t) => {
  const text = "foo\nbar";
  const expected = "└── foo\n    bar";
  t.is(appendLastArrayPrefix(text), expected);
});
