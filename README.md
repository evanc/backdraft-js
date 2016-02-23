# backdraft-js

Simple function to turn a Draft.js RawDraftContentBlock into a marked-up
string. 

## Install

```
$ npm install --save backdraft-js
```

## Usage
```
var backdraft = require('backdraft-js');

var rawDraftContentBlock = Draft.convertToRaw(contentState);

var markup = {
	'BOLD': ['<strong>', '</strong>'],
	'ITALIC': ['<em>', '</em>']
};

var markedUpBlocks = backdraft(rawDraftContentBlock, markup);

```

## API

### `backdraft(rawDraftContentBlock, markup)` -> `array`

`markup` is an object, the key should be the DraftJS "style" identifier and the
value should be an array: the first item will be appended to the output to
"open" the style and the second tag will be appended to "close" the style. See
"Usage" above for a simple example.