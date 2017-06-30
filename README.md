# boxy
[![CircleCI](https://circleci.com/gh/y0za/boxy.svg?style=svg)](https://circleci.com/gh/y0za/boxy)

convert JSON to box-like appearance

## Installation
```console
$ npm install -g @y0za/boxy
```

## Usage
sample.json content
```json
{
  "object": {
    "text": "some text",
    "number": 123,
    "nested": {
      "bool": true,
      "null": null
    },
    "array": [
      "first",
      "second",
      "third"
    ]
  }
}
```

```console
$ boxy sample.json
┌─────────────────────┐
│ object ───────────┐ │
│ │ text: some text │ │
│ │ number: 123     │ │
│ │ nested ──────┐  │ │
│ │ │ bool: true │  │ │
│ │ │ null: null │  │ │
│ │ └────────────┘  │ │
│ │ array           │ │
│ │ ├── [0]: first  │ │
│ │ ├── [1]: second │ │
│ │ └── [2]: third  │ │
│ └─────────────────┘ │
└─────────────────────┘
```

## License
MIT License
