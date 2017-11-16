# Feedbox

This is a little feedback box that uses [Formspree](https://formspree.io/). Visitors on your site can just use this box to send you feedback.

# Install
On any website, just import the javascript source `feedbox.js` that is in the `dist` folder of the repo:
```html
<script src="feedbox.js"></script>
```

Then, between two `<script>` markups, initialize a `Feedbox`

```html
<script>
var fbck = new feedbox.Feedbox( "your@email.com" );
</script>
```

Of course, `your@email.com` has to be replace by the email you want to receive emails at.
