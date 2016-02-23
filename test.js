var expect = require('expect');

var backdraft = require('./index');

var raw = {
  "entityMap": {},
  "blocks": [{
    "key": "a30dm",
    "text": "We're just three MCs and one D.J.",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [{
      "offset": 11,
      "length": 9,
      "style": "BOLD"
    }, {
      "offset": 25,
      "length": 8,
      "style": "BOLD"
    }, {
      "offset": 17,
      "length": 11,
      "style": "ITALIC"
    }],
    "entityRanges": []
  }]
};

var markup = {
  BOLD: ['<strong>', '</strong>'],
  ITALIC: ['<em>', '</em>']
};

expect(backdraft(raw, markup)[0]).toBe("We're just <strong>three <em>MCs</em></strong><em> and <strong>one</strong></em><strong> D.J.</strong>");

console.log('Success!');