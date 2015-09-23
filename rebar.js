/*!
 * Rebar 1.0
 * @author Andy Mikulski <github.com/andymikulski>
 * @url https://github.com/andymikulski/rebar
 */
;
(function(window, document, undefined) {

  var Rebar = (function(Rebar) {
    return {
      'defaultRegisters': [
        'div', 'p', 'span', 'a', 'input', 'form', 'ol', 'ul', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
      ],

      'init': function() {
        var rebar = this;

        rebar._registerDefaults();

        return rebar;
      },

      '_registerDefaults': function() {
        var rebar = this,
          i;

        for (i = rebar.defaultRegisters.length - 1; i >= 0; i--) {
          rebar.register(rebar.defaultRegisters[i]);
        }

        return rebar;
      },

      'register': function(elName) {
        var rebar = this;

        if (!(elName instanceof Array)) {
          elName = [elName];
        }

        for (var i = 0; i < elName.length; i++) {
          rebar[elName[i]] = (function(printedEl) {
            return function() {
              var args = Array.prototype.slice.call(arguments);
              return rebar.printElement(printedEl, (args.length &&
                  typeof args[0] === 'object') ? args.shift() : {},
                args.join(''));
            }
          }(elName[i]));
        }

      },

      'printElement': function(element, attributes, content) {
        var combinedString = '<' + element,
          attr;

        for (attr in attributes) {
          var safeAttr = attr.replace(/className/gi, 'class');

          combinedString += ' ' + safeAttr + '="' + attributes[attr] +
            '"';
        }

        combinedString += '>' + content + '</' + element + '>';

        return combinedString;
      }
    };
  })(window.Rebar || {});

  window.Rebar = Rebar.init();
  return window.Rebar;

})(window, document);