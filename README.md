# Rebar
## HTML string generator + injector

Compose a set of elements using JS syntax, and get a composed string in return. Useful when you need to drop markup on the page you dont have control of.

## Usage

Include `rebar.js` or `rebar.min.js` on the page, or if you've got bower, `bower install andymikulski/rebar`.

Use rebar to construct 'elements' for you to use later:

```
var newDiv = Rebar.div('Text in the div!',
                Rebar.span('Nested span!),
                Rebar.span({ className: 'my-class' }, 'Span with a class!')
              );
```

A compiled string is returned with which you can manipulate as you see fit.


## Usage Explained

```
  // Define a container with a form, some labels, and various inputs
  var modalHTML =
    // If the first parameter is an object, those will be interpreted
    // as element attributes to embed during creation
    Rebar.div(
      { className: 'modal' },
      Rebar.h1('Log in to Rewriter CMS'),
      Rebar.form(
        Rebar.span('Username'),
        Rebar.input({
          type: 'text',
          name: 'username',
          required: 'true',
          ref: 'txtUser'
        }),
        Rebar.span('Password'),
        Rebar.input({
          type: 'password',
          name: 'pass',
          required: 'true',
          ref: 'txtPass'
        }),
        Rebar.input({
          type: 'submit',
          value: 'Log in',
          ref: 'btnLogin'
        }),
        Rebar.input({
          type: 'submit',
          value: 'Cancel',
          ref: 'btnCancel'
        })
      )
    );

  // Now, you can handle your chunk of HTML however you see fit!

  // ez mode jQuery example:
  $(document.body).append(modalHTML);


  // We can add a bit of dynamics to our DOM creation,
  // via IIFEs to return Rebar components!

  var itemControls = {
    'Save': 'btnSave',
    'Undo': 'btnUndo'
  };

  var controlPanelHTML =
    Rebar.div(
      Rebar.ul(
        // Use an IIFE to return a string or Rebar command
        (function() {
          var list = '';

          for (var fnCaption in itemControls) {
            // Since Rebar simply returns a string,
            // we can do simple concatenation on it to build lists

            // here we're using a hash to define refs (to look up the elements later if needed) as well as the captions
            list = list + Rebar.li({
              ref: itemControls[fnCaption]
            }, fnCaption);
          }

          // return the string and Rebar keeps chugging along
          return list;
        })(),
        Rebar.li('This is the last list element, and is hard-coded!');
      )
    );

  // Is rebar missing an element you want to build with?
  Rebar.register('yourElement');
  Rebar.yourElement('woo!');
  // -> <yourElement>woo!</yourElement>
```

===


### Credits

Developed by [Andy Mikulski](http://www.andymikulski.com/).
