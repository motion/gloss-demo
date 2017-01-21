### Simple gloss demo

I think gloss is best explained by playing around with it. Theme's are very powerful, but hard to grok without seeing them. So, this.

![](https://cloud.githubusercontent.com/assets/12100/22178126/afcfcb5e-dfe3-11e6-823f-41d5c2e1df04.png)

Specifically, check out [the pane.js file](https://github.com/motion/gloss-demo/blob/master/pane.js). I'm not claiming it's good or even ok code, because I'm extracting it extensively from a bigger and more arbitrary file. But, it does sort of show a few pieces of theming.

To me, themes are something I can't go back to now having. Being able to re-style *multiple* elements is a fundamental thing you need when making robust views. And doing so with many-layered conditional statements, or imperative function calls is a mess, and a big step back from CSS.

In this demo unfortunately there aren't any *really* complex uses. Only one theme actually re-styles multiple elements. But it is a little sandbox you can start with and play around.

Button shows a more complex theme, which takes `bordered` and `color` as it's two themes. Again, it only re-styles a single element, so not the best use case, but it does show mixing two different theme props.
