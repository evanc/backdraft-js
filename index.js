var _ = require('lodash');

// values in haystack must be unique
function containsSome(haystack, needles) {
  return haystack.length > _.difference(haystack, needles).length;
}

function relevantStyles(offset, styleRanges) {
  var styles = _.filter(styleRanges, function(range) {
    return (offset >= range.offset && offset < (range.offset + range.length));
  });
  return styles.map(function (style) {return style.style});
}

function buildMarkup(rawDraftContentState, markup) {

  var blocks = rawDraftContentState.blocks;
  return blocks.map(function convertBlock(block) {

    var outputText = [];
    var styleStack = [];
    var text = block.text;
    var ranges = block.inlineStyleRanges;

    // loop over every char in this block's text
    for (var i = 0; i < text.length; i++) {

      // figure out what styles this char and the next char need
      // (regardless of whether there *is* a next char or not)
      var characterStyles = relevantStyles(i, ranges);
      var nextCharacterStyles = relevantStyles(i + 1, ranges);
      
      // calculate styles to add and remove
      var stylesToAdd = _.difference(characterStyles, styleStack);
      var stylesToRemove = _.difference(characterStyles, nextCharacterStyles);

      // add styles we will need for this char
      stylesToAdd.forEach(function(style) {
        styleStack.push(style);
        outputText.push(markup[style][0]);
      });

      outputText.push(text.substr(i, 1));

      // remove styles we won't need anymore
      while (containsSome(styleStack, stylesToRemove)) {
        var toRemove = styleStack.pop();
        outputText.push(markup[toRemove][1]);
      }
    }

    return outputText.join('');
  });

}

module.exports = buildMarkup;