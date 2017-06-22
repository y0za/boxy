import test from 'ava';

import {
  convert,
  insertArrayPrefix,
  insertLastArrayPrefix,
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

test('insertArrayPrefix single line', (t) => {
  const text = 'foo';
  const expected = '├-- foo';
  t.is(insertArrayPrefix(text), expected);
});

test('insertArrayPrefix multiple line', (t) => {
  const text = "foo\nbar";
  const expected = "├-- foo\n|   bar";
  t.is(insertArrayPrefix(text), expected);
});

test('insertArrayPrefix single line', (t) => {
  const text = 'foo';
  const expected = '└-- foo';
  t.is(insertLastArrayPrefix(text), expected);
});

test('insertLastArrayPrefix multiple line', (t) => {
  const text = "foo\nbar";
  const expected = "└-- foo\n    bar";
  t.is(insertLastArrayPrefix(text), expected);
});
