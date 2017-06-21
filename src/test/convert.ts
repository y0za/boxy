import test from 'ava';

import {
  insertArrayPrefix,
  insertLastArrayPrefix,
} from '../convert';

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
