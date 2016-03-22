# enlighten
Enlighten jQuery Plugin

This jQuery plugin allows the user to add a systematic lightening or darkening effect to the background color of repetitive row like 
structures in HTML (repetitive tr's, li's, div's, etc.).

For a long time as developers, we have performed a light/dark row background for tabular data using the modulo operator.  Depending on the result we create an every-other row light/dark effect.

I recently read an article that mentioned the optimum color change for visibility is every 3 rows.  That gave me the idea to create a plugin that allows the user to specify the row interval - every 2, 3, 5, up to 'n' and 'BaseColor' to base the lightening/darkening effect.

However instead of simple light/dark - I chose to do a gradient between rows.  For example 3 rows - will be displayed at:

<pre>
baseColor
baseColor + colorChangeAmount
baseColor + colorChangeAmount + colorChangeAmount
(Repeat)

Not:
Dark
Light
Light
(Repeat)
</pre>

https://github.com/KrisReeves/enlighten/blob/master/Every2.PNG
https://github.com/KrisReeves/enlighten/blob/master/Every3.PNG
https://github.com/KrisReeves/enlighten/blob/master/EveryN.PNG
