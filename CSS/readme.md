From YT- Fronted Master

CSS Tip 1:
use position: relative for parent element on which you want to float its child, if using position: absolute for child element

CSS Tip 2: Smooth transition on hover
div1 {
    transition: background-color 300ms linear, , width 1000ms linear;
    or 
    transition: all 1000ms linear;
}
div1:hover {
    background-color: blue;
    width: 400px;
    opacity: 0.7;
}

CSS Tip 4: Center content
.parent {
    display: grid;
    place-content: center;
    or
    display: flex;
    align-items: center;
    justify-content: center;
    or
    position: relative
    then .child {
        position: absolute;
        left: 50%;
        top: 50%; /*Moves full child wrt top left corner of parent*/
        transform: translate(-50%,-50%); /*required for correcrion of position of child*/
    }
    or (horizontal center)
    text-align: center
    or
    margin: auto;
}

CSS Tip 5: will not increase div size
padding: 10px;
box-sizing: border-box;

CSS Tip 6: arrow up and down
.arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.left, .right {
    height: 20px;
    width: 4px;
    background-color: black;
    transition: all 300ms linear;
}
.left {
    transform: rotate(-45deg);
}
.right {
    transform: rotate(45deg);
    margin-left: 8px;
}
.arrow-down .left {
    transform: rotate(45deg);
}
.arrow-down .right {
    transform: rotate(-45deg);
}
<div class="arrow">
    <div class="left"></div>
    <div class="right"></div>
</div>
<button onclick="toggle()">Toggle</button>
function toggle() {
    let ele =  document.querySelector(".arrow");
    ele.classList.toggle("arrow-down");
}

CSS Tip 7: Resizable div
overflow: auto/hidden;
resize: both/vertical/horizontal;

CSS Tip 8: margin collapsing
Margin collapsing occurs when the vertical margins of adjacent block-level elements (like paragraphs or divs) combine or "collapse" into a single margin instead of adding together. Larger margin takes effect instead of both margins adding up.

CSS Tip 10: works like button disabled
pointer-events: none;

CSS Tip 11:
cursor: pointer;            

CSS Tip 12: Urer will not be able to select
user-select: none;

CSS Tip 13:
text-transform: uppercase or lowercase or capitalize;

CSS Tip 14:
letter-spacing: 2px;
word-spacing: 2px;
line-height: 10px;

CSS Tip 15:
text-decoration: underline;
text-decoration-style: wavy;
text-decoration-thickness: 1.5px;

CSS Tip 16:
.input1 {
    caret-color: red;
}
body {
    caret-color: transparent;   //if do not want blinking caret anywhere on website
}

CSS Tip 17: Change style of place holder in input
.input1::placeholder {
    color: yellow;
}

CSS Tip 18: Outline of input
.input1:focus {
    outline-color: 0 or blue;
}

CSS Tip 19:transition on position shift
default value of position is necessary otherwise transition will not work
.box{
    position: relative; left: 0;
    transition: all 1s linear;
}
.box:hover {
    left: 150px;
}

CSS Tip 21:Properties that will not work on inline element: width, height, margin-top ,margin-bottom, padding-top, padding-bottom, float, clear, border(top and bottom not fully).
But except float and clear all of them will work with inline block.
float and clear are outdated now.

CSS Tip 22: avoid html tag selectors in css, since parsing is form left to right, it will take extra time to exactly find it.

CSS Tip 24:
max-width is important for important elements

CSS Tip 25: when selecting a text
.box::selection {
    background-color: red;
    text-shadow: 4px 4px yellow;
}

CSS Tip 26: first letter
.box::first-letter {
    font-size: 40px;
    color: green;
} 

CSS Tip 27: lines/ words do not take extra space using hyphens for last letters and shift to next line if extra
p {
    text-align: justify;
    hyphens: auto;
}
p {
  word-wrap: break-word; /* Ensures long words or URLs break */
  hyphens: auto;         /* Allows hyphenation if applicable */
  overflow-wrap: break-word; /* Prevents overflow for long URLs */
}

CSS Tip 28: to find all empty tags in DOM
:empty {
    border: 2px solid black;
    height: 10px; width: 40px;
}

CSS Tip 30: rem default value- 16px (1rem)
we can change- <html styel="font-size: 32px">
use case- font size can change accoding to user's custom font size

CSS Tip 32: inheritance in css
color, font size, font family, line height.. can be passed down to children, while box model elements can not like padding margin. But it could be e.g.
.child {
    height: inherit; -> will take height of its parent
}

CSS Tip 33: textarea is resizable. so we can do,
textarea {
    resize: none;
}

You could know little bit of extra CSS and could change the world. ~ me

CSS Tip 34: list bullets customize
.list or ul {
    list-style-type: circle;
    list-style-image: url('image-url');
}
but there is no way to change size of this image, so instead use-
.list li {
    background-image: url('image-url');
    background-size: 20px 20px; /* Customize the size of the image */
    background-repeat: no-repeat;
    background-position: 0 50%; /* Align the image vertically */
    padding-left: 30px; /* Add space to the left for the image */
    margin-bottom: 10px;
}

CSS Tip 37: control line number in a div
.text {   //3 number of lines
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    or 
    white-space: nowrap;  /*1 line*/
    max-width: 400px;
}

CSS Tip 38: Increase clickable area using ::before or ::after
The ::before and ::after pseudo-elements in CSS are used to insert content before or after an element's actual content.
.cross {
    position: relative;
}
.cross::before {
    content: " ";
    position: absolute;
    height: 40px;
    width: 40px;
    left: -8px;
    top: -8px;
}

CSS Tip 39: Organize CSS properties, sort
VS code extension: https://marketplace.visualstudio.com/items?itemName=henriiik.vscode-sort
select styles then press: shift + alt + s

CSS Tip 41:
Light and dark mode via chrome dev tools
Elements-> Styles -> Toggle common rendering(paintbrush icon)

CSS Tip 43: it changes color of input typer- radio, range, checkbox,... throughout. also can be used on elements.
:root {
    accent-color: red;
}

CSS Tip 44: :root and html tag are same, but :root has more specificity/priority, and mostly used for css variables
--primary-color: red;   //create variable
backgroun-color: var(--primary-color);  //call variable

CSS Tip 47: if margin or padding are in % then it calculation is on the basis of width always of its parent, not height. Because height is mostly dynamic.

CSS Tip 48: if height are in % then ensure its parent have some height of its own. 

CSS Tip 49: hover does not work in mobile so it works abruptly if hover is applied in mobile. so first check is device support hover-
@media (hover: hover) {
    img:hover {
        ...properties
    }
}
if hover is not supported-
@media (hover: not) {
}

CSS Tip 50: fixed and sticky
.fixed {
    position: fixed;
    right: 10px;
}
.sticky {
    top: 4px;  //top is important for sticky otherwise will not work
    position: sticky;
}

CSS Tip 51: If parent element of sticky goes out of viewport then sticky element will also not visibe, its only visible inside its parent.

CSS Tip 52: transform- lets you rotate, scale, skew, or translate an element. It modifies the coordinate space
can not be transformed- non-replaced inline boxes, table-column boxes, and table-column-group boxes
multiple transforms in one line-
transform- translate(10px, 0px, 20px) rotate(10deg) scale(2, 0.5) skew(30deg, 20deg);
transform-origin- sets the origin for an element's transformations
transform-origin: center(default) | 50% 50% | top left;
perspective and perspective-origin can be used along with transform and transitions to create 3D animations.

CSS Tip 53: @supports- checks if browser supports certain properties, then only executes css
@supports (display: flex) {
  .flex-container > * {
    display: flex;
  }
}

CSS Tip 54: No hover effect or pointer event. Can be used to prevent bubbling effect of hover to child element(s)
pointer-event: none;

CSS Tip 55: Background to text only
background-clip: text;
color: transparent;

CSS Tip 56: Invert color-
filter: invert(100%); or invert(1);
Invert color according to background-   (should be applied to root)
mix-blend-mode: difference;

CSS Tip 57:
Property	    Visibility	    Layout Impact	    Interactivity
display: none	Hidden	        Removes space	    No
visibility:     Hidden	        Space remains	    No
opacity: 0	    Invisible	    Space remains	    Yes

CSS Tip 58: Media query for landscape and potrait mode
@media screen and (orientation: landscape/potrait)
Most used media queries- min-width, max-width, min-height, max-height, orientation