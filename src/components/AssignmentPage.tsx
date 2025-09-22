import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpenIcon, 
  ClipboardDocumentCheckIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  PlayIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Topic {
  id: string;
  title: string;
  content: string;
  examples?: string[];
  syntax?: string;
}

interface AssignmentData {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  questions: Question[];
}

const AssignmentPage = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'study' | 'test'>('study');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  // Comprehensive assignment data
  const getAssignmentData = (id: string): AssignmentData | null => {
    const assignments: {[key: string]: AssignmentData} = {
      'frontend-beginner-4': {
        id: 'frontend-beginner-4',
        title: 'CSS Part 1',
        topics: [
          {
            id: 'css-introduction',
            title: 'CSS Introduction',
            content: `CSS (Cascading Style Sheets) describes how HTML elements are to be displayed on screen, paper, or in other media. CSS saves a lot of work. It can control the layout of multiple web pages all at once.

What is CSS?
• CSS stands for Cascading Style Sheets
• CSS describes how HTML elements are to be displayed
• CSS saves a lot of work. It can control the layout of multiple web pages all at once
• External stylesheets are stored in CSS files

Why Use CSS?
CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.

CSS Solved a Big Problem:
HTML was NEVER intended to contain tags for formatting a web page! HTML was created to describe the content of a web page.

When tags like <font>, and color attributes were added to the HTML 3.2 specification, it started a nightmare for web developers. Development of large websites, where fonts and color information were added to every single page, became a long and expensive process.

To solve this problem, the World Wide Web Consortium (W3C) created CSS. CSS removed the style formatting from the HTML page!

CSS Saves a Lot of Work!
The style definitions are normally saved in external .css files. With an external stylesheet file, you can change the look of an entire website by changing just one file!`,
            syntax: 'selector {\n  property: value;\n  property: value;\n}',
            examples: [
              '/* External CSS file (styles.css) */\nbody {\n  background-color: lightblue;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: navy;\n  margin-left: 20px;\n}\n\n/* Internal CSS */\n<style>\n  p {\n    color: red;\n    text-align: center;\n  }\n</style>\n\n/* Inline CSS */\n<h1 style="color:blue;text-align:center;">This is a heading</h1>\n<p style="color:red;">This is a paragraph.</p>'
            ]
          },
          {
            id: 'css-syntax',
            title: 'CSS Syntax',
            content: `A CSS rule consists of a selector and a declaration block. The selector points to the HTML element you want to style. The declaration block contains one or more declarations separated by semicolons.

CSS Syntax Structure:
selector {
  property: value;
  property: value;
}

CSS Selectors:
• Element Selector - selects HTML elements based on the element name
• ID Selector - uses the id attribute of an HTML element to select a specific element
• Class Selector - selects HTML elements with a specific class attribute
• Universal Selector - selects all HTML elements on the page
• Grouping Selector - selects all the HTML elements with the same style definitions

CSS Declarations:
Each declaration includes a CSS property name and a value, separated by a colon. Multiple CSS declarations are separated with semicolons, and declaration blocks are surrounded by curly braces.

CSS Comments:
Comments are used to explain the code, and may help when you edit the source code at a later date. Comments are ignored by browsers.

CSS Case Sensitivity:
CSS is case-insensitive. However, if you use the XHTML DOCTYPE, CSS is case-sensitive.`,
            syntax: '/* CSS Syntax */\nselector {\n  property: value;\n}\n\n/* Comment */\n/* This is a comment */\nproperty: value; /* This is also a comment */',
            examples: [
              '/* Element selector */\np {\n  text-align: center;\n  color: red;\n}\n\n/* ID selector */\n#para1 {\n  text-align: center;\n  color: red;\n}\n\n/* Class selector */\n.center {\n  text-align: center;\n  color: red;\n}\n\n/* Universal selector */\n* {\n  text-align: center;\n  color: blue;\n}\n\n/* Grouping selector */\nh1, h2, p {\n  text-align: center;\n  color: red;\n}\n\n/* Multiple properties */\nh1 {\n  color: blue;\n  font-family: verdana;\n  font-size: 300%;\n}\n\n/* CSS with comments */\np {\n  color: red; /* Set text color to red */\n  /* This is a comment */\n  text-align: center;\n}'
            ]
          },
          {
            id: 'css-selectors',
            title: 'CSS Selectors',
            content: `CSS selectors are used to "find" (or select) the HTML elements you want to style. We can divide CSS selectors into five categories:

1. Simple Selectors:
• Element selector - select elements based on the element name
• ID selector - select elements based on the id attribute
• Class selector - select elements based on the class attribute
• Universal selector - select all elements
• Grouping selector - select multiple elements

2. Combinator Selectors:
• Descendant selector (space) - select elements inside other elements
• Child selector (>) - select direct children
• Adjacent sibling selector (+) - select immediately following sibling
• General sibling selector (~) - select all following siblings

3. Pseudo-class Selectors:
• :hover - select elements when user hovers over them
• :active - select active elements
• :focus - select elements that have focus
• :first-child - select first child element
• :last-child - select last child element
• :nth-child() - select specific child elements

4. Pseudo-element Selectors:
• ::before - insert content before an element
• ::after - insert content after an element
• ::first-line - select first line of text
• ::first-letter - select first letter of text

5. Attribute Selectors:
• [attribute] - select elements with a specific attribute
• [attribute="value"] - select elements with a specific attribute value
• [attribute~="value"] - select elements with attribute containing a specific word
• [attribute|="value"] - select elements with attribute starting with a specific value`,
            syntax: '/* Element selector */\nelement { }\n\n/* ID selector */\n#id { }\n\n/* Class selector */\n.class { }\n\n/* Attribute selector */\n[attribute="value"] { }',
            examples: [
              '/* Simple selectors */\np { color: blue; } /* All paragraphs */\n#myId { color: red; } /* Element with id="myId" */\n.myClass { color: green; } /* Elements with class="myClass" */\n* { margin: 0; } /* All elements */\nh1, h2, h3 { font-family: Arial; } /* Multiple elements */\n\n/* Combinator selectors */\ndiv p { color: blue; } /* Paragraphs inside divs */\ndiv > p { color: red; } /* Direct child paragraphs of divs */\nh1 + p { margin-top: 0; } /* Paragraph immediately after h1 */\nh1 ~ p { color: gray; } /* All paragraphs after h1 */\n\n/* Pseudo-class selectors */\na:hover { color: red; }\ninput:focus { border: 2px solid blue; }\nli:first-child { font-weight: bold; }\ntr:nth-child(even) { background-color: #f2f2f2; }\n\n/* Pseudo-element selectors */\np::first-line { font-weight: bold; }\np::first-letter { font-size: 200%; }\n.quote::before { content: """; }\n.quote::after { content: """; }\n\n/* Attribute selectors */\ninput[type="text"] { border: 1px solid gray; }\na[href^="https"] { color: green; }\nimg[alt~="photo"] { border: 2px solid blue; }'
            ]
          },
          {
            id: 'css-how-to',
            title: 'CSS How To',
            content: `When a browser reads a style sheet, it will format the HTML document according to the information in the style sheet. There are three ways of inserting a style sheet:

1. External CSS:
With an external style sheet, you can change the look of an entire website by changing just one file! Each HTML page must include a reference to the external style sheet file inside the <link> element, inside the head section.

2. Internal CSS:
An internal style sheet may be used if one single HTML page has a unique style. The internal style is defined inside the <style> element, inside the head section.

3. Inline CSS:
An inline style may be used to apply a unique style for a single element. To use inline styles, add the style attribute to the relevant element. The style attribute can contain any CSS property.

Cascading Order:
What style will be used when there is more than one style specified for an HTML element?

All the styles in a page will "cascade" into a new "virtual" style sheet by the following rules, where number one has the highest priority:

1. Inline style (inside an HTML element)
2. External and internal style sheets (in the head section)
3. Browser default

So, an inline style has the highest priority, and will override external and internal styles and browser defaults.`,
            syntax: '/* External CSS */\n<link rel="stylesheet" href="styles.css">\n\n/* Internal CSS */\n<style>\n  selector { property: value; }\n</style>\n\n/* Inline CSS */\n<element style="property: value;">',
            examples: [
              '<!-- External CSS -->\n<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="mystyle.css">\n</head>\n<body>\n  <h1>This is a heading</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>\n\n<!-- mystyle.css file -->\nbody {\n  background-color: lightblue;\n}\n\nh1 {\n  color: navy;\n  margin-left: 20px;\n}\n\n<!-- Internal CSS -->\n<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody {\n  background-color: linen;\n}\n\nh1 {\n  color: maroon;\n  margin-left: 40px;\n}\n</style>\n</head>\n<body>\n  <h1>This is a heading</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>\n\n<!-- Inline CSS -->\n<!DOCTYPE html>\n<html>\n<body>\n  <h1 style="color:blue;text-align:center;">This is a heading</h1>\n  <p style="color:red;">This is a paragraph.</p>\n</body>\n</html>\n\n<!-- Multiple CSS sources -->\n<head>\n  <link rel="stylesheet" href="external.css">\n  <style>\n    h1 { color: orange; } /* Internal CSS */\n  </style>\n</head>\n<body>\n  <h1 style="color: purple;">Heading</h1> <!-- Inline CSS wins -->\n</body>'
            ]
          },
          {
            id: 'css-comments',
            title: 'CSS Comments',
            content: `CSS comments are used to explain the code, and may help when you edit the source code at a later date. Comments are ignored by browsers.

CSS Comment Syntax:
A CSS comment is placed inside the <style> element, and starts with /* and ends with */.

Benefits of CSS Comments:
• Explain complex code sections
• Temporarily disable code
• Add notes for future reference
• Document authorship and dates
• Explain browser-specific hacks
• Mark sections of large stylesheets

Best Practices for CSS Comments:
• Use comments to explain "why" not "what"
• Keep comments up to date
• Use consistent comment formatting
• Comment complex selectors and calculations
• Add section headers for organization
• Document browser compatibility issues

Types of CSS Comments:
• Single-line comments
• Multi-line comments
• Section headers
• Inline comments
• TODO comments

CSS Comments vs HTML Comments:
CSS comments use /* */ while HTML comments use <!-- -->. CSS comments cannot be nested.`,
            syntax: '/* This is a single-line comment */\n\n/*\nThis is\na multi-line\ncomment\n*/\n\nproperty: value; /* Inline comment */',
            examples: [
              '/* =================================\n   MAIN STYLESHEET\n   Author: John Doe\n   Date: 2024-01-15\n   ================================= */\n\n/* Reset styles */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n/* =================================\n   TYPOGRAPHY\n   ================================= */\n\nbody {\n  font-family: Arial, sans-serif; /* Fallback font */\n  line-height: 1.6;\n  color: #333;\n}\n\n/* Heading styles */\nh1, h2, h3 {\n  margin-bottom: 1rem;\n  font-weight: bold;\n}\n\n/* =================================\n   LAYOUT\n   ================================= */\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n\n/* Grid system */\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 -15px; /* Negative margin for gutters */\n}\n\n.col {\n  flex: 1;\n  padding: 0 15px;\n}\n\n/* =================================\n   COMPONENTS\n   ================================= */\n\n/* Button component */\n.btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background-color: #007bff;\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  transition: background-color 0.3s ease; /* Smooth hover effect */\n}\n\n.btn:hover {\n  background-color: #0056b3; /* Darker blue on hover */\n}\n\n/* TODO: Add responsive breakpoints */\n/* TODO: Optimize for mobile devices */\n\n/*\n.old-style {\n  display: table; // Temporarily disabled\n  width: 100%;\n}\n*/'
            ]
          },
          {
            id: 'css-colors',
            title: 'CSS Colors',
            content: `Colors are specified using predefined color names, or RGB, HEX, HSL, RGBA, HSLA values.

CSS Color Values:
• Color Names - predefined color names like "red", "blue", "green"
• HEX Values - hexadecimal color values like "#ff0000"
• RGB Values - red, green, blue values like "rgb(255, 0, 0)"
• RGBA Values - RGB with alpha (transparency) like "rgba(255, 0, 0, 0.5)"
• HSL Values - hue, saturation, lightness like "hsl(0, 100%, 50%)"
• HSLA Values - HSL with alpha like "hsla(0, 100%, 50%, 0.5)"

Color Names:
CSS supports 140 standard color names. Examples include red, blue, green, yellow, orange, purple, pink, brown, black, white, gray, etc.

HEX Colors:
A hexadecimal color is specified with: #RRGGBB, where the RR (red), GG (green) and BB (blue) hexadecimal integers specify the components of the color.

RGB Colors:
An RGB color value is specified with: rgb(red, green, blue). Each parameter (red, green, and blue) defines the intensity of the color between 0 and 255.

HSL Colors:
HSL stands for hue, saturation, and lightness. Hue is a degree on the color wheel from 0 to 360. Saturation is a percentage value, and lightness is also a percentage value.

Transparency:
You can add transparency to colors by using RGBA or HSLA color values, or by using the opacity property.`,
            syntax: '/* Color name */\ncolor: red;\n\n/* HEX value */\ncolor: #ff0000;\n\n/* RGB value */\ncolor: rgb(255, 0, 0);\n\n/* RGBA value */\ncolor: rgba(255, 0, 0, 0.5);\n\n/* HSL value */\ncolor: hsl(0, 100%, 50%);\n\n/* HSLA value */\ncolor: hsla(0, 100%, 50%, 0.5);',
            examples: [
              '/* Color names */\nh1 { color: red; }\np { color: blue; }\n.highlight { background-color: yellow; }\n\n/* HEX colors */\n.header { background-color: #ff6b6b; }\n.text { color: #333333; }\n.border { border-color: #cccccc; }\n\n/* RGB colors */\n.box1 { background-color: rgb(255, 99, 71); }\n.box2 { background-color: rgb(60, 179, 113); }\n.box3 { background-color: rgb(106, 90, 205); }\n\n/* RGBA colors (with transparency) */\n.overlay { background-color: rgba(0, 0, 0, 0.5); }\n.button { background-color: rgba(255, 99, 71, 0.8); }\n\n/* HSL colors */\n.primary { color: hsl(200, 100%, 50%); }\n.secondary { color: hsl(120, 100%, 25%); }\n.accent { color: hsl(60, 100%, 50%); }\n\n/* HSLA colors (with transparency) */\n.card { background-color: hsla(210, 100%, 95%, 0.9); }\n.shadow { box-shadow: 0 2px 4px hsla(0, 0%, 0%, 0.1); }\n\n/* Gradient using multiple colors */\n.gradient {\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);\n}\n\n/* Color variables (CSS custom properties) */\n:root {\n  --primary-color: #3498db;\n  --secondary-color: #2ecc71;\n  --danger-color: #e74c3c;\n}\n\n.button-primary {\n  background-color: var(--primary-color);\n}'
            ]
          },
          {
            id: 'css-backgrounds',
            title: 'CSS Backgrounds',
            content: `The CSS background properties are used to add background effects for elements.

CSS Background Properties:
• background-color - sets the background color of an element
• background-image - sets the background image for an element
• background-repeat - sets how a background image will be repeated
• background-attachment - sets whether a background image is fixed or scrolls
• background-position - sets the starting position of a background image
• background-size - specifies the size of the background images
• background-origin - specifies the origin position of a background image
• background-clip - specifies the painting area of the background

Background Color:
The background-color property specifies the background color of an element. The color can be specified by color name, HEX value, RGB value, etc.

Background Image:
The background-image property specifies an image to use as the background of an element. By default, the image is repeated so it covers the entire element.

Background Repeat:
By default, the background-image property repeats an image both horizontally and vertically. You can control this with background-repeat.

Background Position:
The background-position property is used to specify the position of the background image.

Background Attachment:
The background-attachment property specifies whether the background image should scroll or be fixed.

Background Shorthand:
To shorten the code, it is also possible to specify all the background properties in one single property.`,
            syntax: '/* Individual properties */\nbackground-color: value;\nbackground-image: url("image.jpg");\nbackground-repeat: value;\nbackground-position: value;\n\n/* Shorthand */\nbackground: color image repeat attachment position;',
            examples: [
              '/* Background color */\nbody {\n  background-color: lightblue;\n}\n\n.header {\n  background-color: #f0f0f0;\n}\n\n/* Background image */\n.hero {\n  background-image: url("hero-bg.jpg");\n  height: 500px;\n}\n\n/* Background repeat */\n.pattern {\n  background-image: url("pattern.png");\n  background-repeat: repeat; /* Default */\n}\n\n.no-repeat {\n  background-image: url("logo.png");\n  background-repeat: no-repeat;\n}\n\n.repeat-x {\n  background-image: url("border.png");\n  background-repeat: repeat-x; /* Only horizontally */\n}\n\n/* Background position */\n.centered {\n  background-image: url("image.jpg");\n  background-repeat: no-repeat;\n  background-position: center center;\n}\n\n.top-right {\n  background-image: url("icon.png");\n  background-repeat: no-repeat;\n  background-position: top right;\n}\n\n/* Background size */\n.cover {\n  background-image: url("large-image.jpg");\n  background-size: cover; /* Cover entire element */\n  background-position: center;\n}\n\n.contain {\n  background-image: url("image.jpg");\n  background-size: contain; /* Fit entire image */\n}\n\n/* Background attachment */\n.fixed-bg {\n  background-image: url("bg.jpg");\n  background-attachment: fixed;\n  background-size: cover;\n}\n\n/* Multiple backgrounds */\n.multi-bg {\n  background-image: \n    url("overlay.png"),\n    url("background.jpg");\n  background-position: \n    center center,\n    top left;\n  background-repeat: \n    no-repeat,\n    repeat;\n}\n\n/* Background shorthand */\n.shorthand {\n  background: #f0f0f0 url("bg.jpg") no-repeat center center / cover;\n}\n\n/* Gradient backgrounds */\n.gradient {\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n}\n\n.radial-gradient {\n  background: radial-gradient(circle, #ff6b6b, #4ecdc4);\n}'
            ]
           },
          {
            id: 'css-height-width',
            title: 'CSS Height/Width',
            content: `The CSS height and width properties are used to set the height and width of an element.

Height and Width Values:
• auto - This is default. The browser calculates the height and width
• length - Defines the height/width in px, cm, etc.
• % - Defines the height/width in percent of the containing block
• initial - Sets the height/width to its default value
• inherit - The height/width will be inherited from its parent value

Setting max-width:
The max-width property is used to set the maximum width of an element. This prevents the value of the width property from becoming larger than max-width.

Setting min-width and min-height:
The min-width and min-height properties are used to set the minimum width and height of an element.

Height and Width vs Max/Min:
• width/height - sets exact dimensions
• max-width/max-height - sets maximum dimensions
• min-width/min-height - sets minimum dimensions

Responsive Design:
Using max-width instead of width makes elements responsive and prevents overflow on smaller screens.`,
            syntax: '/* Basic dimensions */\nwidth: 300px;\nheight: 200px;\n\n/* Percentage */\nwidth: 50%;\nheight: 100vh;\n\n/* Max/Min dimensions */\nmax-width: 500px;\nmin-height: 300px;',
            examples: [
              '/* Fixed dimensions */\n.fixed-box {\n  width: 300px;\n  height: 200px;\n  background-color: lightblue;\n}\n\n/* Percentage dimensions */\n.percent-box {\n  width: 50%;\n  height: 300px;\n  background-color: lightgreen;\n}\n\n/* Responsive with max-width */\n.responsive-container {\n  width: 100%;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n/* Min and max dimensions */\n.flexible-box {\n  width: 80%;\n  min-width: 300px;\n  max-width: 600px;\n  min-height: 200px;\n  max-height: 400px;\n  background-color: lightyellow;\n}\n\n/* Viewport units */\n.fullscreen {\n  width: 100vw; /* 100% of viewport width */\n  height: 100vh; /* 100% of viewport height */\n}\n\n.half-screen {\n  width: 50vw;\n  height: 50vh;\n}\n\n/* Auto dimensions */\n.auto-width {\n  width: auto; /* Default */\n  height: 150px;\n}\n\n/* Image responsive */\n.responsive-image {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Card with controlled dimensions */\n.card {\n  width: 100%;\n  max-width: 400px;\n  min-height: 200px;\n  padding: 20px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n}\n\n/* Button with min-width */\n.button {\n  min-width: 120px;\n  height: 40px;\n  padding: 0 20px;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n}'
            ]
          },
          {
            id: 'css-outline',
            title: 'CSS Outline',
            content: `An outline is a line that is drawn around elements, OUTSIDE the borders, to make the element "stand out".

CSS Outline Properties:
• outline-style - specifies the style of the outline
• outline-color - specifies the color of the outline
• outline-width - specifies the width of the outline
• outline-offset - specifies the space between an outline and the edge/border of an element
• outline - shorthand property for setting all outline properties

Outline vs Border:
• Outline does NOT take up space (not part of the element's dimensions)
• Outline may be non-rectangular
• Outline is always on top of the element
• Outline does not affect the layout

Outline Styles:
• dotted - Defines a dotted outline
• dashed - Defines a dashed outline
• solid - Defines a solid outline
• double - Defines a double outline
• groove - Defines a 3D grooved outline
• ridge - Defines a 3D ridged outline
• inset - Defines a 3D inset outline
• outset - Defines a 3D outset outline
• none - Defines no outline
• hidden - Defines a hidden outline

Outline Offset:
The outline-offset property adds space between an outline and the edge/border of an element.`,
            syntax: '/* Individual properties */\noutline-style: solid;\noutline-width: 2px;\noutline-color: red;\noutline-offset: 5px;\n\n/* Shorthand */\noutline: width style color;',
            examples: [
              '/* Basic outlines */\n.solid-outline {\n  outline: 2px solid red;\n}\n\n.dashed-outline {\n  outline: 3px dashed blue;\n}\n\n.dotted-outline {\n  outline: 1px dotted green;\n}\n\n/* Outline with offset */\n.offset-outline {\n  outline: 2px solid orange;\n  outline-offset: 5px;\n}\n\n/* Different outline styles */\n.groove-outline {\n  outline: 4px groove #ccc;\n}\n\n.ridge-outline {\n  outline: 4px ridge #ccc;\n}\n\n.double-outline {\n  outline: 3px double black;\n}\n\n/* Focus outline for accessibility */\n.button:focus {\n  outline: 2px solid #007bff;\n  outline-offset: 2px;\n}\n\n/* Remove default outline */\n.no-outline {\n  outline: none; /* Use carefully - affects accessibility */\n}\n\n/* Custom focus indicator */\n.custom-focus:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);\n}\n\n/* Outline on hover */\n.hover-outline:hover {\n  outline: 2px solid #28a745;\n  outline-offset: 3px;\n}\n\n/* Form input outlines */\ninput:focus {\n  outline: 2px solid #007bff;\n  outline-offset: 1px;\n}\n\n/* Card with outline */\n.outlined-card {\n  padding: 20px;\n  border: 1px solid #ddd;\n  outline: 1px solid #007bff;\n  outline-offset: 5px;\n}\n\n/* Outline for debugging */\n.debug {\n  outline: 1px solid red !important;\n}\n\n/* Multiple elements with different outlines */\n.warning {\n  outline: 2px solid #ffc107;\n}\n\n.error {\n  outline: 2px solid #dc3545;\n}\n\n.success {\n  outline: 2px solid #28a745;\n}'
            ]
          },
          {
            id: 'css-text',
            title: 'CSS Text',
            content: `CSS has a lot of properties for formatting text.

Text Color:
The color property is used to set the color of the text.

Text Alignment:
The text-align property is used to set the horizontal alignment of a text.
• left - aligns text to the left
• right - aligns text to the right
• center - centers the text
• justify - stretches the lines so that each line has equal width

Text Decoration:
The text-decoration property is used to set or remove decorations from text.
• none - removes any decoration
• underline - adds an underline
• overline - adds an overline
• line-through - adds a line through the text

Text Transformation:
The text-transform property is used to specify uppercase and lowercase letters in a text.
• uppercase - transforms text to uppercase
• lowercase - transforms text to lowercase
• capitalize - capitalizes the first letter of each word

Text Indentation:
The text-indent property is used to specify the indentation of the first line of a text.

Letter and Word Spacing:
• letter-spacing - increases or decreases the space between characters
• word-spacing - increases or decreases the space between words

Line Height:
The line-height property is used to specify the space between lines.

Text Shadow:
The text-shadow property adds shadow to text.`,
            syntax: '/* Text properties */\ncolor: blue;\ntext-align: center;\ntext-decoration: underline;\ntext-transform: uppercase;\ntext-indent: 50px;\nletter-spacing: 2px;\nword-spacing: 5px;\nline-height: 1.5;\ntext-shadow: 2px 2px 4px gray;',
            examples: [
              '/* Text color */\n.red-text {\n  color: red;\n}\n\n.blue-text {\n  color: #0066cc;\n}\n\n.gradient-text {\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\n/* Text alignment */\n.left-align {\n  text-align: left;\n}\n\n.center-align {\n  text-align: center;\n}\n\n.right-align {\n  text-align: right;\n}\n\n.justify-align {\n  text-align: justify;\n}\n\n/* Text decoration */\n.underline {\n  text-decoration: underline;\n}\n\n.overline {\n  text-decoration: overline;\n}\n\n.line-through {\n  text-decoration: line-through;\n}\n\n.no-decoration {\n  text-decoration: none;\n}\n\n/* Multiple decorations */\n.multiple-decoration {\n  text-decoration: underline overline;\n}\n\n/* Text transformation */\n.uppercase {\n  text-transform: uppercase;\n}\n\n.lowercase {\n  text-transform: lowercase;\n}\n\n.capitalize {\n  text-transform: capitalize;\n}\n\n/* Text indentation */\n.indented {\n  text-indent: 50px;\n}\n\n.hanging-indent {\n  text-indent: -20px;\n  padding-left: 20px;\n}\n\n/* Letter and word spacing */\n.letter-spaced {\n  letter-spacing: 2px;\n}\n\n.word-spaced {\n  word-spacing: 10px;\n}\n\n.tight-spacing {\n  letter-spacing: -1px;\n}\n\n/* Line height */\n.single-line {\n  line-height: 1;\n}\n\n.double-line {\n  line-height: 2;\n}\n\n.readable {\n  line-height: 1.6;\n}\n\n/* Text shadow */\n.simple-shadow {\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);\n}\n\n.glow-effect {\n  text-shadow: 0 0 10px #00ff00;\n}\n\n.multiple-shadows {\n  text-shadow: \n    1px 1px 2px black,\n    0 0 25px blue,\n    0 0 5px darkblue;\n}\n\n/* Combined text styling */\n.fancy-heading {\n  color: #333;\n  text-align: center;\n  text-transform: uppercase;\n  letter-spacing: 3px;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n  line-height: 1.2;\n}\n\n/* Link styling */\na {\n  color: #007bff;\n  text-decoration: none;\n}\n\na:hover {\n  text-decoration: underline;\n}\n\n/* Paragraph styling */\n.article-text {\n  color: #333;\n  line-height: 1.6;\n  text-align: justify;\n  text-indent: 2em;\n}'
            ]
          },
          {
            id: 'css-fonts',
            title: 'CSS Fonts',
            content: `The CSS font properties define the font family, boldness, size, and the style of a text.

Font Family:
The font-family property specifies the font for an element. It can hold several font names as a "fallback" system.

Font Style:
The font-style property is mostly used to specify italic text.
• normal - The text is shown normally
• italic - The text is shown in italics
• oblique - The text is "leaning" (oblique is very similar to italic, but less supported)

Font Weight:
The font-weight property specifies the weight of a font.
• normal - Defines normal characters (default)
• bold - Defines thick characters
• bolder - Defines thicker characters
• lighter - Defines lighter characters
• 100-900 - Defines from thin to thick characters (400 is normal, 700 is bold)

Font Variant:
The font-variant property specifies whether or not a text should be displayed in a small-caps font.

Font Size:
The font-size property sets the size of the text.
• Absolute size: xx-small, x-small, small, medium, large, x-large, xx-large
• Relative size: smaller, larger
• Length: px, em, rem, %, etc.

Font Shorthand:
The font property is a shorthand property for font-style, font-variant, font-weight, font-size/line-height, and font-family.

Web Fonts:
CSS allows you to use fonts that are not installed on the user's computer using @font-face or web font services.`,
            syntax: '/* Individual font properties */\nfont-family: Arial, sans-serif;\nfont-style: italic;\nfont-weight: bold;\nfont-size: 16px;\nfont-variant: small-caps;\n\n/* Font shorthand */\nfont: style variant weight size/line-height family;\n\n/* Web fonts */\n@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");',
            examples: [
              '/* Font families */\n.serif-font {\n  font-family: "Times New Roman", Times, serif;\n}\n\n.sans-serif-font {\n  font-family: Arial, Helvetica, sans-serif;\n}\n\n.monospace-font {\n  font-family: "Courier New", Courier, monospace;\n}\n\n.web-font {\n  font-family: "Roboto", sans-serif;\n}\n\n/* Font styles */\n.normal-style {\n  font-style: normal;\n}\n\n.italic-style {\n  font-style: italic;\n}\n\n.oblique-style {\n  font-style: oblique;\n}\n\n/* Font weights */\n.light-weight {\n  font-weight: 300;\n}\n\n.normal-weight {\n  font-weight: 400; /* or normal */\n}\n\n.bold-weight {\n  font-weight: 700; /* or bold */\n}\n\n.extra-bold {\n  font-weight: 900;\n}\n\n/* Font sizes */\n.small-text {\n  font-size: 12px;\n}\n\n.medium-text {\n  font-size: 16px;\n}\n\n.large-text {\n  font-size: 24px;\n}\n\n.responsive-text {\n  font-size: 1.2em; /* Relative to parent */\n}\n\n.root-relative {\n  font-size: 1.5rem; /* Relative to root */\n}\n\n.viewport-text {\n  font-size: 4vw; /* Responsive to viewport */\n}\n\n/* Font variant */\n.small-caps {\n  font-variant: small-caps;\n}\n\n/* Font shorthand examples */\n.shorthand-1 {\n  font: italic bold 16px/1.5 Arial, sans-serif;\n}\n\n.shorthand-2 {\n  font: normal 400 18px/1.6 "Helvetica Neue", Helvetica, sans-serif;\n}\n\n/* Google Fonts import */\n@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap");\n\n.google-font {\n  font-family: "Open Sans", sans-serif;\n}\n\n/* Custom font face */\n@font-face {\n  font-family: "MyCustomFont";\n  src: url("mycustomfont.woff2") format("woff2"),\n       url("mycustomfont.woff") format("woff");\n  font-weight: normal;\n  font-style: normal;\n}\n\n.custom-font {\n  font-family: "MyCustomFont", Arial, sans-serif;\n}\n\n/* Typography scale */\n.heading-1 {\n  font-size: 2.5rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n\n.heading-2 {\n  font-size: 2rem;\n  font-weight: 600;\n  line-height: 1.3;\n}\n\n.body-text {\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.6;\n}\n\n.caption {\n  font-size: 0.875rem;\n  font-weight: 300;\n  line-height: 1.4;\n}\n\n/* Responsive typography */\n@media (max-width: 768px) {\n  .responsive-heading {\n    font-size: 1.5rem;\n  }\n}\n\n@media (min-width: 769px) {\n  .responsive-heading {\n    font-size: 2.5rem;\n  }\n}'
            ]
           },
          {
            id: 'css-icons',
            title: 'CSS Icons',
            content: `Icons can be added to your HTML page by using an icon library, such as Font Awesome, Google Icons, or Bootstrap Icons.

Font Awesome Icons:
To use Font Awesome icons, add the following link inside the <head> section of your HTML page:
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

Google Icons:
To use Google icons, add the following link inside the <head> section:
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

Bootstrap Icons:
To use Bootstrap icons, add the following link:
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

Icon Styling:
Icons can be styled with CSS just like any other HTML element. You can change their size, color, shadow, etc.

Icon Fonts vs SVG Icons:
• Icon fonts - Easy to use, scalable, but limited styling options
• SVG icons - More flexible, better accessibility, smaller file sizes

Creating Custom Icons:
You can create custom icons using CSS or SVG for unique designs.`,
            syntax: '/* Font Awesome */\n<i class="fas fa-home"></i>\n\n/* Google Icons */\n<i class="material-icons">home</i>\n\n/* Bootstrap Icons */\n<i class="bi bi-house"></i>\n\n/* Icon styling */\n.icon {\n  font-size: 24px;\n  color: #007bff;\n}',
            examples: [
              '/* Font Awesome Icons */\n.fa-icon {\n  font-size: 20px;\n  color: #333;\n}\n\n.fa-large {\n  font-size: 2em;\n}\n\n.fa-colored {\n  color: #007bff;\n}\n\n/* Google Material Icons */\n.material-icons {\n  font-size: 24px;\n  color: #666;\n  vertical-align: middle;\n}\n\n.material-icons.large {\n  font-size: 48px;\n}\n\n/* Bootstrap Icons */\n.bi {\n  font-size: 1.5rem;\n  color: #28a745;\n}\n\n/* Icon buttons */\n.icon-button {\n  background: none;\n  border: none;\n  font-size: 20px;\n  color: #007bff;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 4px;\n  transition: all 0.3s ease;\n}\n\n.icon-button:hover {\n  background-color: #f8f9fa;\n  color: #0056b3;\n}\n\n/* Icon with text */\n.icon-text {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.icon-text i {\n  font-size: 16px;\n}\n\n/* Animated icons */\n.spinning-icon {\n  animation: spin 2s linear infinite;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n/* Icon sizes */\n.icon-xs { font-size: 12px; }\n.icon-sm { font-size: 16px; }\n.icon-md { font-size: 20px; }\n.icon-lg { font-size: 24px; }\n.icon-xl { font-size: 32px; }\n\n/* Icon colors */\n.icon-primary { color: #007bff; }\n.icon-success { color: #28a745; }\n.icon-warning { color: #ffc107; }\n.icon-danger { color: #dc3545; }\n.icon-info { color: #17a2b8; }\n\n/* SVG Icons */\n.svg-icon {\n  width: 24px;\n  height: 24px;\n  fill: currentColor;\n}\n\n/* Custom CSS Icons */\n.css-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n}\n\n/* Hamburger menu icon */\n.hamburger {\n  width: 30px;\n  height: 20px;\n  position: relative;\n}\n\n.hamburger::before,\n.hamburger::after,\n.hamburger {\n  background: #333;\n  height: 3px;\n  border-radius: 2px;\n}\n\n.hamburger::before,\n.hamburger::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  width: 100%;\n}\n\n.hamburger::before {\n  top: 0;\n}\n\n.hamburger::after {\n  bottom: 0;\n}\n\n/* Close icon */\n.close-icon {\n  width: 20px;\n  height: 20px;\n  position: relative;\n}\n\n.close-icon::before,\n.close-icon::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 100%;\n  height: 2px;\n  background: #333;\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n\n.close-icon::after {\n  transform: translate(-50%, -50%) rotate(-45deg);\n}'
            ]
          },
          {
            id: 'css-links',
            title: 'CSS Links',
            content: `Links can be styled with any CSS property (e.g. color, font-family, background, etc.).

Link States:
Links can be displayed in different ways depending on what state they are in:
• a:link - a normal, unvisited link
• a:visited - a link the user has visited
• a:hover - a link when the user mouses over it
• a:active - a link the moment it is clicked

Order Matters:
When setting the style for several link states, there are some order rules:
• a:hover MUST come after a:link and a:visited
• a:active MUST come after a:hover

Text Decoration:
The text-decoration property is mostly used to remove underlines from links.

Background Color:
The background-color property can be used to specify a background color for links.

Link Buttons:
Links can be styled to look like buttons by adding background colors, padding, borders, etc.

Advanced Link Styling:
You can create sophisticated link effects using CSS transitions, transforms, and pseudo-elements.`,
            syntax: '/* Link states */\na:link { color: blue; }\na:visited { color: purple; }\na:hover { color: red; }\na:active { color: yellow; }\n\n/* Remove underline */\na { text-decoration: none; }\n\n/* Button style */\na.button {\n  background-color: #4CAF50;\n  color: white;\n  padding: 14px 25px;\n  text-decoration: none;\n  display: inline-block;\n}',
            examples: [
              '/* Basic link styling */\na {\n  color: #007bff;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n\na:hover {\n  color: #0056b3;\n  text-decoration: underline;\n}\n\na:visited {\n  color: #6f42c1;\n}\n\na:active {\n  color: #e83e8c;\n}\n\n/* Button-style links */\n.btn-link {\n  display: inline-block;\n  padding: 12px 24px;\n  background-color: #007bff;\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  transition: all 0.3s ease;\n}\n\n.btn-link:hover {\n  background-color: #0056b3;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n}\n\n/* Underline animation */\n.animated-link {\n  position: relative;\n  color: #333;\n  text-decoration: none;\n}\n\n.animated-link::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background-color: #007bff;\n  transition: width 0.3s ease;\n}\n\n.animated-link:hover::after {\n  width: 100%;\n}\n\n/* Navigation links */\n.nav-link {\n  display: block;\n  padding: 10px 15px;\n  color: #333;\n  text-decoration: none;\n  border-radius: 4px;\n  transition: background-color 0.3s ease;\n}\n\n.nav-link:hover {\n  background-color: #f8f9fa;\n  color: #007bff;\n}\n\n.nav-link.active {\n  background-color: #007bff;\n  color: white;\n}\n\n/* Social media links */\n.social-link {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n  color: white;\n  border-radius: 50%;\n  transition: transform 0.3s ease;\n}\n\n.social-link:hover {\n  transform: scale(1.1);\n}\n\n.social-link.facebook {\n  background-color: #3b5998;\n}\n\n.social-link.twitter {\n  background-color: #1da1f2;\n}\n\n.social-link.instagram {\n  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);\n}\n\n/* Breadcrumb links */\n.breadcrumb {\n  display: flex;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.breadcrumb li {\n  display: flex;\n  align-items: center;\n}\n\n.breadcrumb li:not(:last-child)::after {\n  content: "/";\n  margin: 0 8px;\n  color: #6c757d;\n}\n\n.breadcrumb a {\n  color: #007bff;\n  text-decoration: none;\n}\n\n.breadcrumb a:hover {\n  text-decoration: underline;\n}\n\n/* Card links */\n.card-link {\n  display: block;\n  color: inherit;\n  text-decoration: none;\n  transition: transform 0.3s ease;\n}\n\n.card-link:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 16px rgba(0,0,0,0.1);\n}\n\n/* External link indicator */\n.external-link::after {\n  content: "↗";\n  font-size: 0.8em;\n  margin-left: 4px;\n  opacity: 0.7;\n}\n\n/* Download link */\n.download-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background-color: #28a745;\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n}\n\n.download-link:hover {\n  background-color: #218838;\n}\n\n/* Skip link for accessibility */\n.skip-link {\n  position: absolute;\n  top: -40px;\n  left: 6px;\n  background: #000;\n  color: white;\n  padding: 8px;\n  text-decoration: none;\n  z-index: 1000;\n}\n\n.skip-link:focus {\n  top: 6px;\n}'
            ]
          },
          {
            id: 'css-lists',
            title: 'CSS Lists',
            content: `The CSS list properties allow you to set different list item markers for ordered lists, set different list item markers for unordered lists, or set an image as the list item marker.

List Item Markers:
The list-style-type property specifies the type of list item marker.

For Unordered Lists:
• disc - Sets the list item marker to a bullet (default)
• circle - Sets the list item marker to a circle
• square - Sets the list item marker to a square
• none - The list items will not be marked

For Ordered Lists:
• decimal - The list items will be marked with numbers (default)
• decimal-leading-zero - The list items will be marked with numbers with leading zeros
• lower-roman - The list items will be marked with lowercase roman numbers
• upper-roman - The list items will be marked with uppercase roman numbers
• lower-alpha - The list items will be marked with lowercase letters
• upper-alpha - The list items will be marked with uppercase letters

Image as List Item Marker:
The list-style-image property specifies an image as the list item marker.

Position of List Item Markers:
The list-style-position property specifies the position of the list-item markers.
• outside - The bullet points will be outside the list item (default)
• inside - The bullet points will be inside the list item

List Shorthand Property:
The list-style property is a shorthand property for list-style-type, list-style-position, and list-style-image.`,
            syntax: '/* List marker types */\nul { list-style-type: disc; }\nol { list-style-type: decimal; }\n\n/* Image marker */\nul { list-style-image: url("bullet.png"); }\n\n/* Position */\nul { list-style-position: inside; }\n\n/* Shorthand */\nul { list-style: square inside; }',
            examples: [
              '/* Unordered list styles */\n.disc-list {\n  list-style-type: disc;\n}\n\n.circle-list {\n  list-style-type: circle;\n}\n\n.square-list {\n  list-style-type: square;\n}\n\n.no-bullets {\n  list-style-type: none;\n  padding-left: 0;\n}\n\n/* Ordered list styles */\n.decimal-list {\n  list-style-type: decimal;\n}\n\n.roman-list {\n  list-style-type: lower-roman;\n}\n\n.alpha-list {\n  list-style-type: lower-alpha;\n}\n\n.leading-zero {\n  list-style-type: decimal-leading-zero;\n}\n\n/* Custom image markers */\n.custom-bullets {\n  list-style-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iNCIgZmlsbD0iIzAwN2JmZiIvPgo8L3N2Zz4K");\n}\n\n/* List position */\n.inside-markers {\n  list-style-position: inside;\n}\n\n.outside-markers {\n  list-style-position: outside;\n}\n\n/* Styled lists */\n.styled-list {\n  list-style: none;\n  padding: 0;\n}\n\n.styled-list li {\n  padding: 10px 0;\n  border-bottom: 1px solid #eee;\n  position: relative;\n  padding-left: 30px;\n}\n\n.styled-list li::before {\n  content: "✓";\n  position: absolute;\n  left: 0;\n  color: #28a745;\n  font-weight: bold;\n}\n\n/* Navigation list */\n.nav-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.nav-list li {\n  display: inline-block;\n  margin-right: 20px;\n}\n\n.nav-list a {\n  text-decoration: none;\n  color: #333;\n  padding: 10px 15px;\n  display: block;\n  border-radius: 4px;\n  transition: background-color 0.3s ease;\n}\n\n.nav-list a:hover {\n  background-color: #f8f9fa;\n}\n\n/* Vertical navigation */\n.vertical-nav {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  background-color: #f8f9fa;\n  border-radius: 4px;\n}\n\n.vertical-nav li {\n  border-bottom: 1px solid #dee2e6;\n}\n\n.vertical-nav li:last-child {\n  border-bottom: none;\n}\n\n.vertical-nav a {\n  display: block;\n  padding: 12px 16px;\n  color: #333;\n  text-decoration: none;\n  transition: background-color 0.3s ease;\n}\n\n.vertical-nav a:hover {\n  background-color: #e9ecef;\n}\n\n/* Nested lists */\n.nested-list {\n  list-style-type: none;\n  padding-left: 0;\n}\n\n.nested-list > li {\n  margin-bottom: 10px;\n}\n\n.nested-list ul {\n  list-style-type: circle;\n  margin-top: 5px;\n  padding-left: 20px;\n}\n\n/* Definition list styling */\ndt {\n  font-weight: bold;\n  margin-top: 15px;\n  color: #333;\n}\n\ndd {\n  margin-left: 20px;\n  margin-bottom: 10px;\n  color: #666;\n}\n\n/* Horizontal list */\n.horizontal-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  gap: 20px;\n}\n\n/* Numbered steps */\n.steps-list {\n  list-style: none;\n  padding: 0;\n  counter-reset: step-counter;\n}\n\n.steps-list li {\n  counter-increment: step-counter;\n  margin-bottom: 20px;\n  position: relative;\n  padding-left: 60px;\n}\n\n.steps-list li::before {\n  content: counter(step-counter);\n  position: absolute;\n  left: 0;\n  top: 0;\n  background-color: #007bff;\n  color: white;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: bold;\n}\n\n/* Tag list */\n.tag-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.tag-list li {\n  background-color: #e9ecef;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 0.875rem;\n  color: #495057;\n}'
            ]
            },
            {
              id: 'css-navigation-bars',
              title: 'CSS Navigation Bars',
              content: `Navigation bars are essential for website navigation. CSS provides various ways to create attractive and functional navigation bars.

Types of Navigation Bars:
• Horizontal navigation bars
• Vertical navigation bars
• Dropdown navigation bars
• Responsive navigation bars

Basic Navigation Structure:
Navigation bars are typically created using HTML lists (<ul> and <li>) styled with CSS.

Styling Techniques:
• Remove default list styling
• Use flexbox or inline-block for layout
• Add hover effects and transitions
• Implement responsive design

Common Features:
• Active/current page highlighting
• Hover effects
• Dropdown menus
• Mobile-friendly hamburger menus
• Sticky/fixed positioning

Best Practices:
• Use semantic HTML
• Ensure accessibility
• Provide keyboard navigation
• Test on different screen sizes
• Use consistent styling`,
              syntax: '/* Basic horizontal navigation */\nnav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\n\nnav li {\n  margin-right: 20px;\n}\n\nnav a {\n  text-decoration: none;\n  padding: 10px 15px;\n  display: block;\n}\n\nnav a:hover {\n  background-color: #f0f0f0;\n}',
              examples: [
                '/* Horizontal Navigation Bar */\n.navbar {\n  background-color: #333;\n  overflow: hidden;\n}\n\n.navbar ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\n\n.navbar li {\n  flex: 1;\n}\n\n.navbar a {\n  display: block;\n  color: white;\n  text-align: center;\n  padding: 14px 20px;\n  text-decoration: none;\n  transition: background-color 0.3s ease;\n}\n\n.navbar a:hover {\n  background-color: #555;\n}\n\n.navbar a.active {\n  background-color: #007bff;\n}\n\n/* Vertical Navigation Bar */\n.vertical-nav {\n  width: 200px;\n  background-color: #f8f9fa;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow-y: auto;\n}\n\n.vertical-nav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.vertical-nav li {\n  border-bottom: 1px solid #dee2e6;\n}\n\n.vertical-nav a {\n  display: block;\n  color: #333;\n  padding: 15px 20px;\n  text-decoration: none;\n  transition: all 0.3s ease;\n}\n\n.vertical-nav a:hover {\n  background-color: #007bff;\n  color: white;\n  padding-left: 30px;\n}\n\n/* Dropdown Navigation */\n.dropdown-nav {\n  background-color: #333;\n}\n\n.dropdown-nav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\n\n.dropdown-nav > ul > li {\n  position: relative;\n}\n\n.dropdown-nav a {\n  display: block;\n  color: white;\n  padding: 15px 20px;\n  text-decoration: none;\n  transition: background-color 0.3s ease;\n}\n\n.dropdown-nav a:hover {\n  background-color: #555;\n}\n\n/* Dropdown menu */\n.dropdown-nav .dropdown {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: #444;\n  min-width: 200px;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n}\n\n.dropdown-nav li:hover .dropdown {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.dropdown-nav .dropdown li {\n  width: 100%;\n}\n\n.dropdown-nav .dropdown a {\n  padding: 12px 20px;\n  border-bottom: 1px solid #555;\n}\n\n.dropdown-nav .dropdown a:hover {\n  background-color: #666;\n}\n\n/* Responsive Navigation with Hamburger Menu */\n.responsive-nav {\n  background-color: #333;\n  position: relative;\n}\n\n.nav-toggle {\n  display: none;\n  background: none;\n  border: none;\n  color: white;\n  font-size: 18px;\n  padding: 15px 20px;\n  cursor: pointer;\n}\n\n.nav-menu {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\n\n.nav-menu li {\n  margin: 0;\n}\n\n.nav-menu a {\n  display: block;\n  color: white;\n  padding: 15px 20px;\n  text-decoration: none;\n  transition: background-color 0.3s ease;\n}\n\n.nav-menu a:hover {\n  background-color: #555;\n}\n\n/* Mobile styles */\n@media screen and (max-width: 768px) {\n  .nav-toggle {\n    display: block;\n  }\n  \n  .nav-menu {\n    position: absolute;\n    top: 100%;\n    left: 0;\n    width: 100%;\n    background-color: #333;\n    flex-direction: column;\n    max-height: 0;\n    overflow: hidden;\n    transition: max-height 0.3s ease;\n  }\n  \n  .nav-menu.active {\n    max-height: 300px;\n  }\n  \n  .nav-menu li {\n    width: 100%;\n    border-top: 1px solid #555;\n  }\n}\n\n/* Sticky Navigation */\n.sticky-nav {\n  position: sticky;\n  top: 0;\n  background-color: #333;\n  z-index: 100;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n/* Breadcrumb Navigation */\n.breadcrumb {\n  background-color: #f8f9fa;\n  padding: 10px 15px;\n  border-radius: 4px;\n  margin-bottom: 20px;\n}\n\n.breadcrumb ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  align-items: center;\n}\n\n.breadcrumb li {\n  margin-right: 5px;\n}\n\n.breadcrumb li:not(:last-child)::after {\n  content: "/";\n  margin-left: 5px;\n  color: #6c757d;\n}\n\n.breadcrumb a {\n  color: #007bff;\n  text-decoration: none;\n}\n\n.breadcrumb a:hover {\n  text-decoration: underline;\n}\n\n.breadcrumb .current {\n  color: #6c757d;\n}\n\n/* Tab Navigation */\n.tab-nav {\n  border-bottom: 1px solid #dee2e6;\n  margin-bottom: 20px;\n}\n\n.tab-nav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\n\n.tab-nav li {\n  margin-right: 2px;\n}\n\n.tab-nav a {\n  display: block;\n  padding: 12px 20px;\n  text-decoration: none;\n  color: #495057;\n  border: 1px solid transparent;\n  border-bottom: none;\n  border-radius: 4px 4px 0 0;\n  transition: all 0.3s ease;\n}\n\n.tab-nav a:hover {\n  border-color: #dee2e6;\n  background-color: #f8f9fa;\n}\n\n.tab-nav a.active {\n  color: #007bff;\n  background-color: white;\n  border-color: #dee2e6;\n  border-bottom-color: white;\n  margin-bottom: -1px;\n}\n\n/* Animated Navigation */\n.animated-nav {\n  background-color: #333;\n}\n\n.animated-nav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\n\n.animated-nav li {\n  position: relative;\n  overflow: hidden;\n}\n\n.animated-nav a {\n  display: block;\n  color: white;\n  padding: 15px 20px;\n  text-decoration: none;\n  position: relative;\n  z-index: 1;\n  transition: color 0.3s ease;\n}\n\n.animated-nav a::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background-color: #007bff;\n  transition: left 0.3s ease;\n  z-index: -1;\n}\n\n.animated-nav a:hover::before {\n  left: 0;\n}\n\n/* Icon Navigation */\n.icon-nav {\n  background-color: #333;\n}\n\n.icon-nav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  justify-content: center;\n}\n\n.icon-nav a {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: white;\n  padding: 15px 20px;\n  text-decoration: none;\n  transition: all 0.3s ease;\n}\n\n.icon-nav a:hover {\n  background-color: #555;\n  transform: translateY(-2px);\n}\n\n.icon-nav .icon {\n  font-size: 24px;\n  margin-bottom: 5px;\n}\n\n.icon-nav .text {\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}'
              ]
            },
            {
              id: 'css-dropdowns',
              title: 'CSS Dropdowns',
              content: `CSS dropdowns are interactive elements that show/hide content when triggered by user actions like hover or click.

Types of Dropdowns:
• Hover dropdowns
• Click dropdowns
• Multi-level dropdowns
• Mega menus

Basic Structure:
Dropdowns typically consist of a trigger element and a dropdown content container.

Key CSS Properties:
• position: relative/absolute for positioning
• opacity and visibility for show/hide effects
• z-index for layering
• transition for smooth animations

Positioning:
• Use position: relative on the parent
• Use position: absolute on the dropdown content
• Control positioning with top, left, right, bottom

Accessibility:
• Ensure keyboard navigation
• Use proper ARIA attributes
• Provide focus indicators
• Test with screen readers

Best Practices:
• Keep dropdown content organized
• Use consistent styling
• Provide clear visual hierarchy
• Ensure mobile compatibility`,
              syntax: '/* Basic dropdown */\n.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.dropdown-content {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n}\n\n.dropdown:hover .dropdown-content {\n  opacity: 1;\n  visibility: visible;\n}',
              examples: [
                '/* Simple Hover Dropdown */\n.simple-dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.dropdown-button {\n  background-color: #007bff;\n  color: white;\n  padding: 12px 20px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 16px;\n  transition: background-color 0.3s ease;\n}\n\n.dropdown-button:hover {\n  background-color: #0056b3;\n}\n\n.dropdown-content {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: white;\n  min-width: 200px;\n  box-shadow: 0 8px 16px rgba(0,0,0,0.1);\n  border-radius: 4px;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n}\n\n.simple-dropdown:hover .dropdown-content {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.dropdown-content a {\n  display: block;\n  padding: 12px 16px;\n  text-decoration: none;\n  color: #333;\n  transition: background-color 0.3s ease;\n}\n\n.dropdown-content a:hover {\n  background-color: #f8f9fa;\n}\n\n/* Click Dropdown with JavaScript */\n.click-dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.click-dropdown .dropdown-content {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: white;\n  min-width: 200px;\n  box-shadow: 0 8px 16px rgba(0,0,0,0.1);\n  border-radius: 4px;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n}\n\n.click-dropdown.active .dropdown-content {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n/* Multi-level Dropdown */\n.multi-level-dropdown {\n  position: relative;\n}\n\n.multi-level-dropdown ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.multi-level-dropdown > ul {\n  display: flex;\n  background-color: #333;\n}\n\n.multi-level-dropdown li {\n  position: relative;\n}\n\n.multi-level-dropdown a {\n  display: block;\n  color: white;\n  padding: 15px 20px;\n  text-decoration: none;\n  transition: background-color 0.3s ease;\n}\n\n.multi-level-dropdown a:hover {\n  background-color: #555;\n}\n\n/* First level dropdown */\n.multi-level-dropdown .level-1 {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: #444;\n  min-width: 200px;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n}\n\n.multi-level-dropdown li:hover > .level-1 {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n/* Second level dropdown */\n.multi-level-dropdown .level-2 {\n  position: absolute;\n  top: 0;\n  left: 100%;\n  background-color: #555;\n  min-width: 200px;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateX(-10px);\n  transition: all 0.3s ease;\n  z-index: 1001;\n}\n\n.multi-level-dropdown .level-1 li:hover > .level-2 {\n  opacity: 1;\n  visibility: visible;\n  transform: translateX(0);\n}\n\n/* Mega Menu */\n.mega-menu {\n  position: relative;\n}\n\n.mega-menu > ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  background-color: #333;\n}\n\n.mega-menu > ul > li {\n  position: relative;\n}\n\n.mega-menu > ul > li > a {\n  display: block;\n  color: white;\n  padding: 15px 20px;\n  text-decoration: none;\n  transition: background-color 0.3s ease;\n}\n\n.mega-menu > ul > li > a:hover {\n  background-color: #555;\n}\n\n.mega-content {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background-color: white;\n  box-shadow: 0 8px 16px rgba(0,0,0,0.1);\n  padding: 30px;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n}\n\n.mega-menu > ul > li:hover .mega-content {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.mega-columns {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 30px;\n}\n\n.mega-column h3 {\n  color: #333;\n  margin-bottom: 15px;\n  font-size: 18px;\n}\n\n.mega-column ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\n\n.mega-column a {\n  display: block;\n  color: #666;\n  padding: 8px 0;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n\n.mega-column a:hover {\n  color: #007bff;\n}\n\n/* Dropdown with Icons */\n.icon-dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.icon-dropdown .dropdown-content {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: white;\n  min-width: 250px;\n  box-shadow: 0 8px 16px rgba(0,0,0,0.1);\n  border-radius: 8px;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all 0.3s ease;\n  z-index: 1000;\n  overflow: hidden;\n}\n\n.icon-dropdown:hover .dropdown-content {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.icon-dropdown .dropdown-item {\n  display: flex;\n  align-items: center;\n  padding: 12px 16px;\n  text-decoration: none;\n  color: #333;\n  transition: background-color 0.3s ease;\n}\n\n.icon-dropdown .dropdown-item:hover {\n  background-color: #f8f9fa;\n}\n\n.icon-dropdown .dropdown-icon {\n  width: 20px;\n  height: 20px;\n  margin-right: 12px;\n  color: #666;\n}\n\n.icon-dropdown .dropdown-text {\n  flex: 1;\n}\n\n.icon-dropdown .dropdown-description {\n  font-size: 12px;\n  color: #999;\n  margin-top: 2px;\n}\n\n/* Animated Dropdown */\n.animated-dropdown {\n  position: relative;\n  display: inline-block;\n}\n\n.animated-dropdown .dropdown-content {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background-color: white;\n  min-width: 200px;\n  box-shadow: 0 8px 16px rgba(0,0,0,0.1);\n  border-radius: 8px;\n  opacity: 0;\n  visibility: hidden;\n  transform: scale(0.95) translateY(-10px);\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  z-index: 1000;\n  overflow: hidden;\n}\n\n.animated-dropdown:hover .dropdown-content {\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1) translateY(0);\n}\n\n.animated-dropdown .dropdown-item {\n  display: block;\n  padding: 12px 16px;\n  text-decoration: none;\n  color: #333;\n  position: relative;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n\n.animated-dropdown .dropdown-item::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);\n  transition: left 0.5s ease;\n}\n\n.animated-dropdown .dropdown-item:hover::before {\n  left: 100%;\n}\n\n.animated-dropdown .dropdown-item:hover {\n  background-color: #007bff;\n  color: white;\n  transform: translateX(5px);\n}\n\n/* Responsive Dropdown */\n@media screen and (max-width: 768px) {\n  .dropdown-content {\n    position: static;\n    opacity: 1;\n    visibility: visible;\n    transform: none;\n    box-shadow: none;\n    border-radius: 0;\n    width: 100%;\n  }\n  \n  .mega-content {\n    position: static;\n    opacity: 1;\n    visibility: visible;\n    transform: none;\n    padding: 15px;\n  }\n  \n  .mega-columns {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n}'
              ]
            }
          ],
        questions: [
          {
            id: 1,
            question: 'What does CSS stand for?',
            options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
            correctAnswer: 1
          },
          {
            id: 2,
            question: 'Which HTML tag is used to define an internal style sheet?',
            options: ['<css>', '<script>', '<style>', '<link>'],
            correctAnswer: 2
          },
          {
            id: 3,
            question: 'Which is the correct CSS syntax?',
            options: ['body {color: black;}', '{body: color=black;}', 'body: color=black;', '{body; color: black;}'],
            correctAnswer: 0
          },
          {
            id: 4,
            question: 'How do you insert a comment in a CSS file?',
            options: ['// this is a comment', '/* this is a comment */', '<!-- this is a comment -->', "' this is a comment"],
            correctAnswer: 1
          },
          {
            id: 5,
            question: 'Which property is used to change the background color?',
            options: ['color', 'bgcolor', 'background-color', 'bg-color'],
            correctAnswer: 2
          },
          {
            id: 6,
            question: 'How do you select an element with id "demo"?',
            options: ['.demo', '#demo', 'demo', '*demo'],
            correctAnswer: 1
          },
          {
            id: 7,
            question: 'How do you select elements with class name "test"?',
            options: ['.test', '#test', 'test', '*test'],
            correctAnswer: 0
          },
          {
            id: 8,
            question: 'Which CSS property controls the text size?',
            options: ['font-style', 'text-size', 'font-size', 'text-style'],
            correctAnswer: 2
          },
          {
            id: 9,
            question: 'What is the correct way to write a CSS external link?',
            options: ['<link rel="stylesheet" type="text/css" href="mystyle.css">', '<style src="mystyle.css">', '<css>mystyle.css</css>', '<link href="mystyle.css">'],
            correctAnswer: 0
          },
          {
            id: 10,
            question: 'Which CSS property is used to change the text color of an element?',
            options: ['fgcolor', 'color', 'text-color', 'font-color'],
            correctAnswer: 1
          }
        ]
      },
      'frontend-beginner-1': {
        id: 'frontend-beginner-1',
        title: 'HTML Part 1',
        description: 'Master HTML fundamentals and document structure.',
        topics: [
          {
            id: 'html-home',
            title: 'HTML HOME',
            content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It describes the structure of a web page semantically and originally included cues for the appearance of the document.

HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items.

HTML documents are files that end with a .html or .htm extension. You can view them using any web browser such as Google Chrome, Safari, or Mozilla Firefox. The browser reads the HTML file and renders its content so that internet users can view it.`,
            examples: [
              '<!DOCTYPE html>\n<html>\n<head>\n    <title>My First Web Page</title>\n</head>\n<body>\n    <h1>Welcome to HTML!</h1>\n    <p>This is my first paragraph.</p>\n</body>\n</html>'
            ]
          },
          {
            id: 'html-introduction',
            title: 'HTML Introduction',
            content: `HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages. HTML describes the structure of a web page using markup elements.

Key features of HTML:
• HyperText refers to links that connect web pages to one another
• Markup Language means it uses tags to define elements within a document
• HTML elements are represented by tags
• HTML tags label pieces of content such as "heading", "paragraph", "table", and so on
• Browsers do not display the HTML tags, but use them to render the content of the page

HTML is not a programming language; it is a markup language that defines the structure of your content. HTML consists of a series of elements, which you use to enclose, or wrap, different parts of the content to make it appear a certain way, or act a certain way.`,
            examples: [
              '<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n<a href="https://www.example.com">This is a link</a>'
            ]
          },
          {
            id: 'html-editors',
            title: 'HTML Editors',
            content: `You can create HTML files using any text editor. However, professional HTML editors provide features that make coding easier and more efficient.

Popular HTML Editors:
• Visual Studio Code - Free, powerful, with extensions
• Sublime Text - Fast and customizable
• Atom - Open source and hackable
• Notepad++ - Simple and lightweight
• WebStorm - Professional IDE with advanced features
• Brackets - Adobe's open source editor

Features to look for in an HTML editor:
• Syntax highlighting
• Auto-completion
• Error detection
• Live preview
• File management
• Plugin support
• Multi-language support

For beginners, we recommend Visual Studio Code as it's free, user-friendly, and has excellent HTML support with extensions.`,
            examples: [
              '// Example of syntax highlighting in VS Code\n<html>\n  <head>\n    <title>Page Title</title>\n  </head>\n  <body>\n    <h1>My Heading</h1>\n  </body>\n</html>'
            ]
          },
          {
            id: 'html-basic',
            title: 'HTML Basic',
            content: `Every HTML document must have a basic structure. This structure includes the DOCTYPE declaration, html element, head section, and body section.

Basic HTML Document Structure:
1. DOCTYPE Declaration - Tells the browser which version of HTML is being used
2. HTML Element - The root element that contains all other elements
3. Head Section - Contains metadata about the document
4. Body Section - Contains the visible content of the page

The DOCTYPE declaration must be the very first thing in your HTML document, before the <html> tag. It is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in.

The <html> element is the root element of an HTML page. All other elements must be contained within this element.

The <head> element contains meta information about the HTML page that is not displayed on the page itself.

The <body> element defines the document's body and contains all the visible contents.`,
            syntax: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Page Title</title>\n</head>\n<body>\n  <!-- Visible content goes here -->\n</body>\n</html>',
            examples: [
              '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My Website</title>\n</head>\n<body>\n    <h1>Welcome to My Website</h1>\n    <p>This is a basic HTML page.</p>\n</body>\n</html>'
            ]
          },
          {
            id: 'html-elements',
            title: 'HTML Elements',
            content: `HTML elements are the building blocks of HTML pages. An HTML element is defined by a start tag, some content, and an end tag.

HTML Element Syntax:
<tagname>Content goes here...</tagname>

Key points about HTML elements:
• HTML elements are written with a start tag and an end tag
• The element content is everything between the start and end tags
• Some HTML elements have no content (like <br>). These are called empty elements
• Empty elements do not have an end tag
• HTML elements can be nested (elements can contain other elements)
• All HTML documents consist of nested HTML elements

HTML elements can have attributes that provide additional information about the element. Attributes are always specified in the start tag and usually come in name/value pairs.

Common HTML elements include headings (h1-h6), paragraphs (p), links (a), images (img), divisions (div), and spans (span).`,
            syntax: '<tagname attribute="value">Content</tagname>',
            examples: [
              '<h1>This is a heading</h1>\n<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>\n<a href="https://example.com">This is a link</a>\n<img src="image.jpg" alt="Description">\n<br>\n<div>This is a division</div>'
            ]
          },
          {
            id: 'html-attributes',
            title: 'HTML Attributes',
            content: `HTML attributes provide additional information about HTML elements. Attributes are always specified in the start tag and usually come in name/value pairs like name="value".

Key points about attributes:
• All HTML elements can have attributes
• Attributes provide additional information about elements
• Attributes are always specified in the start tag
• Attributes usually come in name/value pairs like: name="value"
• Attribute values should always be quoted

Common HTML Attributes:
• href - Specifies the URL of the page the link goes to
• src - Specifies the path to the image
• width and height - Specify the width and height of images
• alt - Specifies an alternate text for an image
• style - Specifies an inline CSS style for an element
• lang - Specifies the language of the element's content
• title - Specifies extra information about an element
• id - Specifies a unique id for an element
• class - Specifies one or more classnames for an element

The title attribute defines some extra information about an element. The value of the title attribute will be displayed as a tooltip when you mouse over the element.`,
            syntax: '<tagname attribute1="value1" attribute2="value2">Content</tagname>',
            examples: [
              '<a href="https://www.w3schools.com" title="Visit W3Schools">W3Schools Link</a>\n<img src="img_girl.jpg" alt="Girl with a jacket" width="500" height="600">\n<p style="color:red;">This is a red paragraph.</p>\n<div id="myDiv" class="container">Content</div>'
            ]
          },
          {
            id: 'html-headings',
            title: 'HTML Headings',
            content: `HTML headings are defined with the <h1> to <h6> tags. <h1> defines the most important heading. <h6> defines the least important heading.

Heading Hierarchy:
• <h1> - Main heading (largest)
• <h2> - Secondary heading
• <h3> - Third level heading
• <h4> - Fourth level heading
• <h5> - Fifth level heading
• <h6> - Smallest heading

Important points about headings:
• Search engines use headings to index the structure and content of your web pages
• Users often skim a page by its headings
• Use headings to show the document structure
• <h1> headings should be used for main headings, followed by <h2> headings, then the less important <h3>, and so on
• Use HTML headings for headings only. Don't use headings to make text BIG or bold

Headings are important for SEO (Search Engine Optimization) and accessibility. Screen readers use headings to navigate through the content.`,
            syntax: '<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>',
            examples: [
              '<h1>Main Title</h1>\n<h2>Chapter Title</h2>\n<h3>Section Title</h3>\n<p>Some content here...</p>\n<h3>Another Section</h3>\n<p>More content...</p>'
            ]
          },
          {
            id: 'html-paragraphs',
            title: 'HTML Paragraphs',
            content: `The HTML <p> element defines a paragraph. A paragraph always starts on a new line, and browsers automatically add some white space (a margin) before and after a paragraph.

Key points about paragraphs:
• The <p> element automatically adds space before and after itself
• You cannot be sure how HTML will be displayed
• Large or small screens, and resized windows will create different results
• With HTML, you cannot change the display by adding extra spaces or extra lines in your HTML code
• The browser will automatically remove any extra spaces and lines when the page is displayed

HTML Line Breaks:
The HTML <br> element defines a line break. Use <br> if you want a line break (a new line) without starting a new paragraph.

HTML Horizontal Rules:
The <hr> tag defines a thematic break in an HTML page, and is most often displayed as a horizontal rule. The <hr> element is used to separate content (or define a change) in an HTML page.

The <pre> element defines preformatted text. The text inside a <pre> element is displayed in a fixed-width font, and it preserves both spaces and line breaks.`,
            syntax: '<p>This is a paragraph.</p>\n<br>\n<hr>\n<pre>Preformatted text</pre>',
            examples: [
              '<p>This is the first paragraph. It contains some text that will be displayed as a block element.</p>\n<p>This is the second paragraph.<br>This line has a line break.</p>\n<hr>\n<pre>This text\n    preserves    spaces\nand line breaks.</pre>'
            ]
          },
          {
            id: 'html-styles',
            title: 'HTML Styles',
            content: `The HTML style attribute is used to add styles to an element, such as color, font, size, and more. The style attribute specifies an inline style for an element.

Syntax: <tagname style="property:value;">

Common CSS Properties:
• background-color - Defines the background color for an element
• color - Defines the text color for an element
• font-family - Defines the font to be used for an element
• font-size - Defines the text size for an element
• text-align - Defines the horizontal text alignment for an element

Background Color:
The CSS background-color property defines the background color for an HTML element.

Text Color:
The CSS color property defines the text color for an HTML element.

Fonts:
The CSS font-family property defines the font to be used for an HTML element.

Text Size:
The CSS font-size property defines the text size for an HTML element.

Text Alignment:
The CSS text-align property defines the horizontal text alignment for an HTML element.`,
            syntax: '<tagname style="property1:value1;property2:value2;">Content</tagname>',
            examples: [
              '<h1 style="color:blue;">A Blue Heading</h1>\n<p style="color:red;">A red paragraph.</p>\n<h1 style="background-color:powderblue;">This is a heading</h1>\n<p style="background-color:tomato;">This is a paragraph.</p>\n<h1 style="font-family:verdana;">This is a heading</h1>\n<p style="font-family:courier;">This is a paragraph.</p>\n<h1 style="font-size:300%;">This is a heading</h1>\n<h1 style="text-align:center;">Centered Heading</h1>'
            ]
          },
          {
            id: 'html-formatting',
            title: 'HTML Formatting',
            content: `HTML contains several elements for defining text with a special meaning. Formatting elements were designed to display special types of text.

Text Formatting Elements:
• <b> - Bold text
• <strong> - Important text (semantically strong)
• <i> - Italic text
• <em> - Emphasized text (semantically emphasized)
• <mark> - Marked text
• <small> - Smaller text
• <del> - Deleted text
• <ins> - Inserted text
• <sub> - Subscript text
• <sup> - Superscript text

Semantic vs Visual Elements:
• <strong> and <em> are semantic elements that indicate importance and emphasis
• <b> and <i> are visual elements that only change appearance
• Screen readers and search engines understand semantic meaning
• Always prefer semantic elements when possible

Computer Code Elements:
• <code> - Defines a piece of computer code
• <kbd> - Defines keyboard input
• <samp> - Defines sample output from a computer program
• <var> - Defines a variable in programming or in a mathematical expression
• <pre> - Defines preformatted text`,
            syntax: '<strong>Important text</strong>\n<em>Emphasized text</em>\n<code>Computer code</code>',
            examples: [
              '<p><b>This text is bold</b></p>\n<p><strong>This text is important!</strong></p>\n<p><i>This text is italic</i></p>\n<p><em>This text is emphasized</em></p>\n<p>This is <mark>marked</mark> text.</p>\n<p>This is <small>smaller</small> text.</p>\n<p>This is <del>deleted</del> text.</p>\n<p>This is <ins>inserted</ins> text.</p>\n<p>This is <sub>subscript</sub> and <sup>superscript</sup></p>\n<p>The <code>printf()</code> function prints formatted output.</p>'
            ]
          },
          {
            id: 'html-quotations',
            title: 'HTML Quotations',
            content: `HTML provides several elements for quotations and citations. These elements help structure content semantically and provide meaning to quoted text.

Quotation Elements:
• <blockquote> - Defines a section that is quoted from another source
• <q> - Defines a short quotation
• <abbr> - Defines an abbreviation or acronym
• <address> - Defines contact information for the author/owner of a document
• <cite> - Defines the title of a creative work
• <bdo> - Defines bi-directional override

The <blockquote> Element:
The HTML <blockquote> element defines a section that is quoted from another source. Browsers usually indent <blockquote> elements.

The <q> Element:
The HTML <q> tag defines a short quotation. Browsers normally insert quotation marks around the quotation.

The <abbr> Element:
The HTML <abbr> tag defines an abbreviation or an acronym. Marking abbreviations can give useful information to browsers, translation systems and search engines.

The <address> Element:
The HTML <address> tag defines contact information for the author/owner of a document or article. The contact information can be an email address, URL, physical address, phone number, social media handle, etc.

The <cite> Element:
The HTML <cite> tag defines the title of a creative work (e.g. a book, a poem, a song, a movie, a painting, a sculpture, etc.).`,
            syntax: '<blockquote cite="URL">Quote text</blockquote>\n<q>Short quote</q>\n<abbr title="Full form">Abbreviation</abbr>',
            examples: [
              '<blockquote cite="http://www.worldwildlife.org/who/index.html">\nFor 50 years, WWF has been protecting the future of nature.\n</blockquote>\n<p>WWF\'s goal is to: <q>Build a future where people live in harmony with nature.</q></p>\n<p>The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>\n<address>\nWritten by John Doe.<br>\nVisit us at:<br>\nExample.com<br>\nBox 564, Disneyland<br>\nUSA\n</address>\n<p><cite>The Scream</cite> by Edvard Munch. Painted in 1893.</p>'
            ]
          },
          {
            id: 'html-comments',
            title: 'HTML Comments',
            content: `HTML comments are not displayed in the browser, but they can help document your HTML source code. Comments are useful for explaining your code, which can help you when you edit the source code at a later date.

Comment Syntax:
<!-- This is a comment -->

Key points about HTML comments:
• Comments are not displayed by the browser
• Comments can help document your HTML source code
• Comments can be used to hide content temporarily
• Comments can span multiple lines
• Comments cannot be nested
• Comments are visible in the page source

Uses of Comments:
• Documenting your code for future reference
• Explaining complex sections of HTML
• Temporarily hiding content during development
• Adding notes for other developers
• Marking sections of your HTML document
• Adding copyright information or author details

Best Practices:
• Use comments to explain why something is done, not what is done
• Keep comments concise and relevant
• Update comments when you change the code
• Don't overuse comments for obvious code
• Use comments to mark the beginning and end of sections`,
            syntax: '<!-- This is a single line comment -->\n<!--\nThis is a\nmulti-line comment\n-->',
            examples: [
              '<!-- This is the header section -->\n<header>\n    <h1>Welcome to My Website</h1>\n    <!-- Navigation menu -->\n    <nav>\n        <ul>\n            <li><a href="#home">Home</a></li>\n            <li><a href="#about">About</a></li>\n        </ul>\n    </nav>\n</header>\n<!-- End of header section -->\n\n<!-- Main content area -->\n<main>\n    <p>This is the main content.</p>\n    <!-- TODO: Add more content here -->\n</main>'
            ]
          },
          {
            id: 'html-colors',
            title: 'HTML Colors',
            content: `HTML colors are specified with predefined color names, or with RGB, HEX, HSL, RGBA, or HSLA values.

Color Names:
HTML supports 140 standard color names. Examples include: red, blue, green, yellow, orange, purple, pink, brown, black, white, gray, etc.

HEX Colors:
A hexadecimal color is specified with: #RRGGBB, where the RR (red), GG (green) and BB (blue) hexadecimal integers specify the components of the color.

RGB Colors:
An RGB color value is specified with: rgb(red, green, blue). Each parameter (red, green, and blue) defines the intensity of the color between 0 and 255.

RGBA Colors:
RGBA color values are an extension of RGB color values with an alpha channel - which specifies the opacity for a color. An RGBA color value is specified with: rgba(red, green, blue, alpha).

HSL Colors:
HSL stands for hue, saturation, and lightness. An HSL color value is specified with: hsl(hue, saturation, lightness).

HSLA Colors:
HSLA color values are an extension of HSL color values with an alpha channel - which specifies the opacity for a color.`,
            syntax: 'color: red;\ncolor: #ff0000;\ncolor: rgb(255, 0, 0);\ncolor: rgba(255, 0, 0, 0.5);\ncolor: hsl(0, 100%, 50%);',
            examples: [
              '<h1 style="color:Tomato;">Hello World</h1>\n<p style="color:DodgerBlue;">Lorem ipsum...</p>\n<p style="color:MediumSeaGreen;">Ut wisi enim...</p>\n\n<h1 style="color:#ff6347;">Hello World</h1>\n<p style="color:#1e90ff;">Lorem ipsum...</p>\n<p style="color:#3cb371;">Ut wisi enim...</p>\n\n<h1 style="color:rgb(255, 99, 71);">Hello World</h1>\n<p style="color:rgb(30, 144, 255);">Lorem ipsum...</p>\n<p style="color:rgb(60, 179, 113);">Ut wisi enim...</p>\n\n<h1 style="color:rgba(255, 99, 71, 0.5);">Hello World</h1>\n<p style="color:rgba(30, 144, 255, 0.3);">Lorem ipsum...</p>'
            ]
          },
          {
            id: 'html-css',
            title: 'HTML CSS',
            content: `CSS (Cascading Style Sheets) is used to format the layout of a webpage. With CSS, you can control the color, font, the size of text, the spacing between elements, how elements are positioned and laid out, what background images or background colors are to be used, different displays for different devices and screen sizes, and much more!

Ways to Add CSS:
There are three ways of inserting a style sheet:
• External CSS
• Internal CSS
• Inline CSS

External CSS:
With an external style sheet, you can change the look of an entire website by changing just one file! Each HTML page must include a reference to the external style sheet file inside the <link> element, inside the head section.

Internal CSS:
An internal style sheet may be used if one single HTML page has a unique style. The internal style is defined inside the <style> element, inside the head section.

Inline CSS:
An inline style may be used to apply a unique style for a single element. To use inline styles, add the style attribute to the relevant element.

CSS Cascading Order:
What style will be used when there is more than one style specified for an HTML element?
1. Inline style (inside an HTML element)
2. External and internal style sheets (in the head section)
3. Browser default`,
            syntax: '<!-- External CSS -->\n<link rel="stylesheet" href="styles.css">\n\n<!-- Internal CSS -->\n<style>\nbody {background-color: lightblue;}\n</style>\n\n<!-- Inline CSS -->\n<h1 style="color:blue;">A Blue Heading</h1>',
            examples: [
              '<!-- External CSS -->\n<!DOCTYPE html>\n<html>\n<head>\n<link rel="stylesheet" href="mystyle.css">\n</head>\n<body>\n<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n</body>\n</html>\n\n<!-- Internal CSS -->\n<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody {\n  background-color: linen;\n}\nh1 {\n  color: maroon;\n  margin-left: 40px;\n}\n</style>\n</head>\n<body>\n<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n</body>\n</html>'
            ]
          },
          {
            id: 'html-links',
            title: 'HTML Links',
            content: `HTML links are hyperlinks. You can click on a link and jump to another document. When you move the mouse over a link, the mouse arrow will turn into a little hand.

The HTML <a> tag defines a hyperlink. It has the following syntax:
<a href="url">link text</a>

The most important attribute of the <a> element is the href attribute, which indicates the link's destination.

Types of Links:
• Links to other pages on the same website (relative URLs)
• Links to pages on other websites (absolute URLs)
• Links to sections within the same page (anchors)
• Links to email addresses (mailto:)
• Links to phone numbers (tel:)

Link Targets:
The target attribute specifies where to open the linked document:
• _self - Default. Opens the document in the same window/tab
• _blank - Opens the document in a new window or tab
• _parent - Opens the document in the parent frame
• _top - Opens the document in the full body of the window

Link Colors:
By default, links will appear as follows in all browsers:
• An unvisited link is underlined and blue
• A visited link is underlined and purple
• An active link is underlined and red

You can change the link colors by using CSS.`,
            syntax: '<a href="URL" target="_blank" title="Description">Link Text</a>',
            examples: [
              '<a href="https://www.w3schools.com">Visit W3Schools.com!</a>\n<a href="https://www.google.com" target="_blank">Visit Google!</a>\n<a href="mailto:someone@example.com">Send email</a>\n<a href="tel:+1234567890">Call us</a>\n<a href="#section1">Go to Section 1</a>\n\n<!-- Link with image -->\n<a href="https://www.w3schools.com">\n<img src="w3schools.jpg" alt="W3Schools" style="width:42px;height:42px;">\n</a>\n\n<!-- Link to download file -->\n<a href="/files/document.pdf" download>Download PDF</a>'
            ]
          },
          {
            id: 'html-images',
            title: 'HTML Images',
            content: `Images can improve the design and the appearance of a web page. The HTML <img> tag is used to embed an image in a web page.

The <img> tag is empty, it contains attributes only, and does not have a closing tag. The <img> tag has two required attributes:
• src - Specifies the path to the image
• alt - Specifies an alternate text for the image

Image Attributes:
• src - Source file path
• alt - Alternative text (important for accessibility)
• width - Width of the image
• height - Height of the image
• title - Additional information (tooltip)
• loading - Lazy loading behavior

Image Formats:
Common image formats supported by browsers:
• JPEG/JPG - Good for photographs
• PNG - Good for images with transparency
• GIF - Good for simple animations
• SVG - Vector graphics, scalable
• WebP - Modern format with better compression

Responsive Images:
Use CSS to make images responsive:
img { max-width: 100%; height: auto; }

Image Maps:
The <map> tag defines an image map. An image map is an image with clickable areas.

Figure and Figcaption:
The <figure> tag specifies self-contained content, and the <figcaption> tag defines a caption for a <figure> element.`,
            syntax: '<img src="image.jpg" alt="Description" width="500" height="300">',
            examples: [
              '<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">\n<img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;">\n<img src="img_girl.jpg" alt="Girl in a jacket" style="float:right;width:42px;height:42px;">\n\n<!-- Responsive image -->\n<img src="img_girl.jpg" alt="Girl in a jacket" style="max-width:100%;height:auto;">\n\n<!-- Figure with caption -->\n<figure>\n  <img src="pic_trulli.jpg" alt="Trulli" style="width:100%">\n  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>\n</figure>\n\n<!-- Image as a link -->\n<a href="https://www.w3schools.com">\n  <img src="w3schools.jpg" alt="W3Schools" style="width:42px;height:42px;">\n</a>'
            ]
          },
          {
            id: 'html-favicon',
            title: 'HTML Favicon',
            content: `A favicon is a small image displayed next to the page title in the browser tab. A favicon image is displayed to the left of the page title in the browser tab.

How to Add a Favicon:
You can use any image you like as your favicon. You can also create your own favicon on sites like https://www.favicon.cc.

To add a favicon to your website, either save your favicon image to the root directory of your web server, or create a folder in the root directory called images, and save your favicon image in this folder. A common name for a favicon image is "favicon.ico".

Next, add a <link> element to your "index.html" file, after the <title> element:

Favicon File Formats:
• ICO - Traditional format, supported by all browsers
• PNG - Modern format, good quality
• SVG - Vector format, scalable
• GIF - Animated favicons possible

Favicon Sizes:
Common favicon sizes:
• 16x16 pixels - Standard size
• 32x32 pixels - High DPI displays
• 48x48 pixels - Windows site icons
• 180x180 pixels - Apple touch icon

Multiple Favicon Sizes:
You can specify multiple favicon sizes for different devices and contexts.`,
            syntax: '<link rel="icon" type="image/x-icon" href="/images/favicon.ico">',
            examples: [
              '<!-- Basic favicon -->\n<link rel="icon" type="image/x-icon" href="/favicon.ico">\n\n<!-- PNG favicon -->\n<link rel="icon" type="image/png" href="/favicon.png">\n\n<!-- Multiple sizes -->\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n\n<!-- Apple touch icon -->\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n\n<!-- Android chrome -->\n<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">\n<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">'
            ]
          },
          {
            id: 'html-page-title',
            title: 'HTML Page Title',
            content: `Every HTML document should have a title. The title is shown in the browser's title bar or in the page's tab. The HTML <title> element defines the title of the document.

The <title> element:
• Defines a title in the browser toolbar
• Provides a title for the page when it is added to favorites
• Displays a title for the page in search engine results
• Is required in HTML documents
• Must be placed inside the <head> element
• Should be descriptive and meaningful

Title Best Practices:
• Place scripts at the end of the body for better performance
• Use external JavaScript files for reusability
• Always include the type attribute for clarity
• Use async or defer attributes for external scripts
• Validate user input with JavaScript
• Handle errors gracefully`,
             syntax: '<!-- Internal JavaScript -->\n<script>\n  // JavaScript code here\n</script>\n\n<!-- External JavaScript -->\n<script src="script.js"></script>\n\n<!-- Inline JavaScript -->\n<button onclick="alert(\'Hello!\')">Click me</button>',
             examples: [
               '<!-- Internal JavaScript -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>JavaScript Example</title>\n</head>\n<body>\n  <h1 id="demo">Hello World!</h1>\n  <button onclick="changeText()">Change Text</button>\n  \n  <script>\n    function changeText() {\n      document.getElementById("demo").innerHTML = "Hello JavaScript!";\n    }\n  </script>\n</body>\n</html>\n\n<!-- External JavaScript -->\n<!DOCTYPE html>\n<html>\n<head>\n  <script src="myScript.js"></script>\n</head>\n<body>\n  <h1>My Web Page</h1>\n  <p id="demo">A Paragraph</p>\n  <button type="button" onclick="myFunction()">Try it</button>\n</body>\n</html>\n\n<!-- Event handling -->\n<script>\n  document.addEventListener("DOMContentLoaded", function() {\n    console.log("Page loaded!");\n  });\n  \n  function validateForm() {\n    var name = document.forms["myForm"]["fname"].value;\n    if (name == "") {\n      alert("Name must be filled out");\n      return false;\n    }\n  }\n</script>\n\n<!-- Form with JavaScript validation -->\n<form name="myForm" onsubmit="return validateForm()" method="post">\n  Name: <input type="text" name="fname">\n  <input type="submit" value="Submit">\n</form>'
             ]
           },
          {
            id: 'css-borders',
            title: 'CSS Borders',
            content: `The CSS border properties allow you to specify the style, width, and color of an element's border.

CSS Border Properties:
• border-style - specifies what kind of border to display
• border-width - specifies the width of the borders
• border-color - specifies the color of the borders
• border - shorthand property for setting all border properties

Border Style:
The border-style property specifies what kind of border to display. The following values are allowed:
• dotted - Defines a dotted border
• dashed - Defines a dashed border
• solid - Defines a solid border
• double - Defines a double border
• groove - Defines a 3D grooved border
• ridge - Defines a 3D ridged border
• inset - Defines a 3D inset border
• outset - Defines a 3D outset border
• none - Defines no border
• hidden - Defines a hidden border

Border Width:
The border-width property specifies the width of the four borders. The width can be set as a specific size (in px, pt, cm, em, etc) or by using one of the three pre-defined values: thin, medium, or thick.

Border Color:
The border-color property is used to set the color of the four borders. The color can be set by name, HEX, RGB, HSL, etc.

Border Sides:
You can specify different borders for different sides using border-top, border-right, border-bottom, border-left.

Border Radius:
The border-radius property is used to add rounded borders to an element.`,
            syntax: '/* Individual properties */\nborder-style: solid;\nborder-width: 2px;\nborder-color: red;\n\n/* Shorthand */\nborder: width style color;\n\n/* Individual sides */\nborder-top: 1px solid black;\nborder-radius: 10px;',
            examples: [
              '/* Basic borders */\n.solid-border {\n  border: 2px solid black;\n}\n\n.dashed-border {\n  border: 3px dashed red;\n}\n\n.dotted-border {\n  border: 1px dotted blue;\n}\n\n/* Different border styles */\n.groove-border {\n  border: 5px groove #ccc;\n}\n\n.ridge-border {\n  border: 5px ridge #ccc;\n}\n\n.double-border {\n  border: 3px double black;\n}\n\n/* Individual sides */\n.top-border {\n  border-top: 2px solid red;\n}\n\n.mixed-borders {\n  border-top: 2px solid red;\n  border-right: 3px dashed blue;\n  border-bottom: 1px dotted green;\n  border-left: 4px double orange;\n}\n\n/* Border width variations */\n.thin-border {\n  border: thin solid black;\n}\n\n.thick-border {\n  border: thick solid black;\n}\n\n.custom-width {\n  border: 5px solid #333;\n}\n\n/* Rounded borders */\n.rounded {\n  border: 2px solid blue;\n  border-radius: 10px;\n}\n\n.circle {\n  width: 100px;\n  height: 100px;\n  border: 2px solid red;\n  border-radius: 50%;\n}\n\n.rounded-corners {\n  border: 2px solid green;\n  border-radius: 15px 50px 30px 5px; /* top-left top-right bottom-right bottom-left */\n}\n\n/* No border */\n.no-border {\n  border: none;\n}\n\n/* Transparent border */\n.transparent-border {\n  border: 2px solid transparent;\n}'
            ]
          },
          {
            id: 'css-margins',
            title: 'CSS Margins',
            content: `The CSS margin properties are used to create space around elements, outside of any defined borders.

CSS Margin Properties:
• margin-top - sets the top margin of an element
• margin-right - sets the right margin of an element
• margin-bottom - sets the bottom margin of an element
• margin-left - sets the left margin of an element
• margin - shorthand property for setting all margin properties

Margin Values:
• auto - the browser calculates the margin
• length - specifies a margin in px, pt, cm, etc.
• % - specifies a margin in % of the width of the containing element
• inherit - specifies that the margin should be inherited from the parent element

Margin Shorthand:
The margin property is a shorthand property for the following individual margin properties:
• margin: 25px; (all four margins are 25px)
• margin: 25px 50px; (top and bottom margins are 25px, right and left margins are 50px)
• margin: 25px 50px 75px; (top margin is 25px, right and left margins are 50px, bottom margin is 75px)
• margin: 25px 50px 75px 100px; (top margin is 25px, right margin is 50px, bottom margin is 75px, left margin is 100px)

Auto Value:
You can set the margin property to auto to horizontally center the element within its container.

Margin Collapse:
Top and bottom margins of elements are sometimes collapsed into a single margin that is equal to the largest of the two margins.`,
            syntax: '/* Individual margins */\nmargin-top: 10px;\nmargin-right: 15px;\nmargin-bottom: 10px;\nmargin-left: 15px;\n\n/* Shorthand */\nmargin: top right bottom left;\nmargin: 10px 15px;\nmargin: auto;',
            examples: [
              '/* Individual margin properties */\n.top-margin {\n  margin-top: 20px;\n}\n\n.right-margin {\n  margin-right: 30px;\n}\n\n.bottom-margin {\n  margin-bottom: 25px;\n}\n\n.left-margin {\n  margin-left: 15px;\n}\n\n/* Margin shorthand - all sides */\n.all-margins {\n  margin: 20px; /* 20px on all sides */\n}\n\n/* Margin shorthand - vertical and horizontal */\n.vh-margins {\n  margin: 10px 20px; /* 10px top/bottom, 20px left/right */\n}\n\n/* Margin shorthand - top, horizontal, bottom */\n.thb-margins {\n  margin: 10px 20px 30px; /* 10px top, 20px left/right, 30px bottom */\n}\n\n/* Margin shorthand - all four sides */\n.four-margins {\n  margin: 10px 15px 20px 25px; /* top right bottom left */\n}\n\n/* Auto margins for centering */\n.centered {\n  width: 300px;\n  margin: 0 auto; /* Center horizontally */\n}\n\n.center-block {\n  width: 50%;\n  margin: 20px auto; /* 20px top/bottom, auto left/right */\n}\n\n/* Percentage margins */\n.percent-margin {\n  margin: 5% 10%; /* 5% top/bottom, 10% left/right */\n}\n\n/* Negative margins */\n.negative-margin {\n  margin-top: -10px; /* Pull element up */\n  margin-left: -5px; /* Pull element left */\n}\n\n/* Zero margins */\n.no-margin {\n  margin: 0;\n}\n\n/* Inherited margins */\n.inherit-margin {\n  margin: inherit;\n}'
            ]
          },
          {
            id: 'css-padding',
            title: 'CSS Padding',
            content: `The CSS padding properties are used to generate space around an element's content, inside of any defined borders.

CSS Padding Properties:
• padding-top - sets the top padding of an element
• padding-right - sets the right padding of an element
• padding-bottom - sets the bottom padding of an element
• padding-left - sets the left padding of an element
• padding - shorthand property for setting all padding properties

Padding Values:
• length - specifies a padding in px, pt, cm, etc.
• % - specifies a padding in % of the width of the containing element
• inherit - specifies that the padding should be inherited from the parent element

Padding Shorthand:
The padding property is a shorthand property for the following individual padding properties:
• padding: 25px; (all four paddings are 25px)
• padding: 25px 50px; (top and bottom paddings are 25px, right and left paddings are 50px)
• padding: 25px 50px 75px; (top padding is 25px, right and left paddings are 50px, bottom padding is 75px)
• padding: 25px 50px 75px 100px; (top padding is 25px, right padding is 50px, bottom padding is 75px, left padding is 100px)

Padding and Element Width:
The CSS width property specifies the width of the element's content area. The content area is the portion inside the padding, border, and margin of an element.

So, if an element has a specified width, the padding added to that element will be added to the total width of the element.`,
            syntax: '/* Individual padding */\npadding-top: 10px;\npadding-right: 15px;\npadding-bottom: 10px;\npadding-left: 15px;\n\n/* Shorthand */\npadding: top right bottom left;\npadding: 10px 15px;',
            examples: [
              '/* Individual padding properties */\n.top-padding {\n  padding-top: 20px;\n}\n\n.right-padding {\n  padding-right: 30px;\n}\n\n.bottom-padding {\n  padding-bottom: 25px;\n}\n\n.left-padding {\n  padding-left: 15px;\n}\n\n/* Padding shorthand - all sides */\n.all-padding {\n  padding: 20px; /* 20px on all sides */\n}\n\n/* Padding shorthand - vertical and horizontal */\n.vh-padding {\n  padding: 10px 20px; /* 10px top/bottom, 20px left/right */\n}\n\n/* Padding shorthand - top, horizontal, bottom */\n.thb-padding {\n  padding: 10px 20px 30px; /* 10px top, 20px left/right, 30px bottom */\n}\n\n/* Padding shorthand - all four sides */\n.four-padding {\n  padding: 10px 15px 20px 25px; /* top right bottom left */\n}\n\n/* Percentage padding */\n.percent-padding {\n  padding: 5% 10%; /* 5% top/bottom, 10% left/right */\n}\n\n/* Zero padding */\n.no-padding {\n  padding: 0;\n}\n\n/* Button with padding */\n.button {\n  padding: 12px 24px;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n}\n\n/* Card with padding */\n.card {\n  padding: 20px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  background-color: white;\n}\n\n/* Text container with padding */\n.text-container {\n  padding: 15px 20px;\n  background-color: #f8f9fa;\n  border-left: 4px solid #007bff;\n}\n\n/* Inherited padding */\n.inherit-padding {\n  padding: inherit;\n}'
            ]
          },
          {
            id: 'css-box-model',
            title: 'CSS Box Model',
            content: `The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.

Box Model Components:
• Content - The content of the box, where text and images appear
• Padding - Clears an area around the content. The padding is transparent
• Border - A border that goes around the padding and content
• Margin - Clears an area outside the border. The margin is transparent

Total Element Width and Height:
When you set the width and height properties of an element with CSS, you just set the width and height of the content area. To calculate the full size of an element, you must also add padding, borders and margins.

Box-Sizing Property:
The box-sizing property allows us to include the padding and border in an element's total width and height.
• content-box (default) - width and height only include the content
• border-box - width and height include content, padding, and border

Standard Box Model vs Border Box:
• Standard: Total width = width + padding + border + margin
• Border-box: Total width = width (includes padding and border) + margin

Understanding the Box Model:
The box model is fundamental to CSS layout. Every element on a web page is a rectangular box, and the CSS box model describes how the size of these boxes is calculated.`,
            syntax: '/* Box model properties */\nwidth: 300px;\nheight: 200px;\npadding: 20px;\nborder: 2px solid black;\nmargin: 10px;\n\n/* Box sizing */\nbox-sizing: border-box;',
            examples: [
              '/* Standard box model example */\n.standard-box {\n  width: 300px;\n  height: 200px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 10px;\n  background-color: lightblue;\n}\n/* Total width = 300px + 40px + 4px + 20px = 364px */\n/* Total height = 200px + 40px + 4px + 20px = 264px */\n\n/* Border-box model example */\n.border-box {\n  box-sizing: border-box;\n  width: 300px;\n  height: 200px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 10px;\n  background-color: lightgreen;\n}\n/* Total width = 300px + 20px = 320px */\n/* Content width = 300px - 40px - 4px = 256px */\n\n/* Universal border-box (recommended) */\n* {\n  box-sizing: border-box;\n}\n\n/* Box model visualization */\n.box-demo {\n  width: 200px;\n  height: 100px;\n  padding: 15px;\n  border: 3px solid #333;\n  margin: 20px;\n  background-color: #f0f0f0;\n  background-clip: content-box; /* Shows content area */\n}\n\n/* Responsive box with border-box */\n.responsive-box {\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 500px;\n  padding: 20px;\n  border: 1px solid #ddd;\n  margin: 0 auto;\n}\n\n/* Card component using box model */\n.card {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  margin: 16px;\n  background-color: white;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n/* Button with proper box model */\n.btn {\n  box-sizing: border-box;\n  display: inline-block;\n  padding: 10px 20px;\n  border: 2px solid #007bff;\n  background-color: #007bff;\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  min-width: 120px;\n  text-align: center;\n}\n\n/* Input field with border-box */\n.input-field {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  font-size: 16px;\n}'
            ]
          }
         ],
         questions: [
           {
             id: 1,
             question: 'What is the purpose of the HTML id attribute?',
             options: ['To style multiple elements', 'To specify a unique identifier for an element', 'To create links', 'To add JavaScript'],
             correctAnswer: 1
           },
           {
             id: 2,
             question: 'How many elements can have the same id in an HTML document?',
             options: ['Unlimited', 'Only one', 'Up to 10', 'Up to 5'],
             correctAnswer: 1
           },
           {
             id: 3,
             question: 'Which HTML tag is used to embed another webpage?',
             options: ['<embed>', '<iframe>', '<object>', '<frame>'],
             correctAnswer: 1
           },
           {
             id: 4,
             question: 'What does the src attribute specify in an iframe?',
             options: ['The size of the iframe', 'The URL of the page to embed', 'The border of the iframe', 'The title of the iframe'],
             correctAnswer: 1
           },
           {
             id: 5,
             question: 'Which HTML tag is used to include JavaScript?',
             options: ['<javascript>', '<script>', '<js>', '<code>'],
             correctAnswer: 1
           },
           {
             id: 6,
             question: 'Where is the best place to put JavaScript code for performance?',
             options: ['In the head section', 'At the beginning of body', 'At the end of body', 'In a separate file'],
             correctAnswer: 2
           },
           {
             id: 7,
             question: 'What is the difference between class and id attributes?',
             options: ['No difference', 'Class is for styling, id is for JavaScript', 'Class can be used multiple times, id must be unique', 'Id is for styling, class is for JavaScript'],
             correctAnswer: 2
           },
           {
             id: 8,
             question: 'Which attribute makes an iframe responsive?',
             options: ['responsive="true"', 'width="100%"', 'auto-resize', 'flexible'],
             correctAnswer: 1
           },
           {
             id: 9,
             question: 'What does the noscript tag do?',
             options: ['Disables JavaScript', 'Shows content when JavaScript is disabled', 'Loads JavaScript files', 'Validates JavaScript'],
             correctAnswer: 1
           },
           {
             id: 10,
             question: 'How do you link to a specific section within the same page?',
             options: ['<a href="section">Link</a>', '<a href="#section">Link</a>', '<a href="./section">Link</a>', '<a href="page#section">Link</a>'],
             correctAnswer: 1
           }
         ]
       },
       'frontend-beginner-5': {
         id: 'frontend-beginner-5',
         title: 'CSS Part 2',
         description: 'Learn advanced CSS concepts including pseudo-elements, pseudo-classes, and responsive design.',
         topics: [
           {
             id: 'css-pseudo-elements',
             title: 'CSS Pseudo-elements',
             content: `A CSS pseudo-element is used to style specified parts of an element.

What are Pseudo-Elements?
A pseudo-element is a virtual element that doesn't exist in your HTML but can be created and styled with CSS.

Common Pseudo-Elements:
• ::before - Insert content before an element's content
• ::after - Insert content after an element's content
• ::first-line - Style the first line of a text
• ::first-letter - Style the first letter of a text
• ::selection - Style the portion of an element that is selected by a user

Syntax:
selector::pseudo-element {
  property: value;
}

::before and ::after:
These pseudo-elements are commonly used to add decorative content to a page without adding extra HTML elements.

Content Property:
The content property is required when using ::before and ::after pseudo-elements.

Use Cases:
• Adding decorative elements
• Creating tooltips
• Adding icons
• Creating overlays
• Styling quotes and citations`,
             syntax: '/* Basic pseudo-elements */\np::first-line {\n  font-weight: bold;\n  color: blue;\n}\n\np::first-letter {\n  font-size: 2em;\n  float: left;\n}\n\n/* Before and after */\n.element::before {\n  content: "★";\n  color: gold;\n}\n\n.element::after {\n  content: "";\n  display: block;\n  clear: both;\n}',
             examples: [
               '/* First line and first letter */\np::first-line {\n  font-weight: bold;\n  color: #333;\n  text-transform: uppercase;\n}\n\np::first-letter {\n  font-size: 3em;\n  float: left;\n  line-height: 1;\n  margin-right: 8px;\n  margin-top: 2px;\n  color: #007bff;\n}\n\n/* Selection styling */\n::selection {\n  background-color: #007bff;\n  color: white;\n}\n\n::-moz-selection {\n  background-color: #007bff;\n  color: white;\n}\n\n/* Before and after decorations */\n.quote::before {\n  content: """;\n  font-size: 2em;\n  color: #ccc;\n  position: absolute;\n  left: -20px;\n  top: -10px;\n}\n\n.quote::after {\n  content: """;\n  font-size: 2em;\n  color: #ccc;\n  position: absolute;\n  right: -20px;\n  bottom: -20px;\n}\n\n/* Icon before text */\n.icon-text::before {\n  content: "📧";\n  margin-right: 8px;\n}\n\n/* Tooltip using pseudo-elements */\n.tooltip {\n  position: relative;\n  cursor: help;\n}\n\n.tooltip::after {\n  content: attr(data-tooltip);\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #333;\n  color: white;\n  padding: 8px 12px;\n  border-radius: 4px;\n  font-size: 14px;\n  white-space: nowrap;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n}\n\n.tooltip:hover::after {\n  opacity: 1;\n  visibility: visible;\n}\n\n/* Clearfix using pseudo-element */\n.clearfix::after {\n  content: "";\n  display: table;\n  clear: both;\n}\n\n/* Overlay effect */\n.image-overlay {\n  position: relative;\n  overflow: hidden;\n}\n\n.image-overlay::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n\n.image-overlay:hover::after {\n  opacity: 1;\n}\n\n/* Counter using pseudo-elements */\n.counter {\n  counter-reset: item;\n}\n\n.counter li {\n  counter-increment: item;\n}\n\n.counter li::before {\n  content: counter(item) ". ";\n  font-weight: bold;\n  color: #007bff;\n}\n\n/* Ribbon effect */\n.ribbon {\n  position: relative;\n  background: #007bff;\n  color: white;\n  padding: 10px 20px;\n  margin: 20px 0;\n}\n\n.ribbon::before {\n  content: "";\n  position: absolute;\n  left: -10px;\n  top: 0;\n  border: 20px solid transparent;\n  border-right-color: #007bff;\n}\n\n/* Progress bar */\n.progress {\n  width: 100%;\n  height: 20px;\n  background: #f0f0f0;\n  border-radius: 10px;\n  overflow: hidden;\n}\n\n.progress::after {\n  content: "";\n  display: block;\n  height: 100%;\n  background: linear-gradient(90deg, #007bff, #0056b3);\n  width: var(--progress, 0%);\n  transition: width 0.3s ease;\n}\n\n/* Speech bubble */\n.speech-bubble {\n  position: relative;\n  background: #f8f9fa;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  padding: 15px;\n  margin-bottom: 20px;\n}\n\n.speech-bubble::after {\n  content: "";\n  position: absolute;\n  bottom: -10px;\n  left: 30px;\n  border: 10px solid transparent;\n  border-top-color: #f8f9fa;\n}'
             ]
           },
           {
             id: 'css-opacity',
             title: 'CSS Opacity',
             content: `The opacity property specifies the opacity/transparency of an element.

Opacity Values:
The opacity property can take a value from 0.0 - 1.0. The lower the value, the more transparent:
• opacity: 1.0 - Fully opaque (default)
• opacity: 0.5 - 50% transparent
• opacity: 0.0 - Fully transparent (invisible)

Transparency using RGBA:
You can also use RGBA color values to set transparency for specific properties like background-color.

Difference between Opacity and RGBA:
• opacity affects the entire element and all its children
• RGBA only affects the specific property it's applied to

Hover Effects:
Opacity is commonly used for hover effects and transitions.

Browser Support:
The opacity property is supported in all modern browsers. For older versions of Internet Explorer, you can use the filter property.

Use Cases:
• Image overlays
• Hover effects
• Loading states
• Disabled elements
• Background overlays`,
             syntax: '/* Basic opacity */\n.transparent {\n  opacity: 0.5;\n}\n\n/* RGBA transparency */\n.rgba-bg {\n  background-color: rgba(255, 0, 0, 0.5);\n}\n\n/* Hover effect */\n.hover-fade:hover {\n  opacity: 0.7;\n  transition: opacity 0.3s ease;\n}',
             examples: [
               '/* Basic opacity levels */\n.opacity-full {\n  opacity: 1.0; /* Fully opaque */\n}\n\n.opacity-high {\n  opacity: 0.8; /* 80% opaque */\n}\n\n.opacity-medium {\n  opacity: 0.5; /* 50% opaque */\n}\n\n.opacity-low {\n  opacity: 0.2; /* 20% opaque */\n}\n\n.opacity-invisible {\n  opacity: 0; /* Fully transparent */\n}\n\n/* Hover effects with opacity */\n.fade-on-hover {\n  opacity: 1;\n  transition: opacity 0.3s ease;\n}\n\n.fade-on-hover:hover {\n  opacity: 0.7;\n}\n\n.reveal-on-hover {\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n\n.reveal-on-hover:hover {\n  opacity: 1;\n}\n\n/* Image gallery with opacity */\n.gallery-item {\n  opacity: 0.6;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n\n.gallery-item:hover {\n  opacity: 1;\n  transform: scale(1.05);\n}\n\n/* RGBA vs Opacity comparison */\n.rgba-background {\n  background-color: rgba(0, 123, 255, 0.5);\n  color: #333; /* Text remains fully opaque */\n}\n\n.opacity-element {\n  background-color: #007bff;\n  opacity: 0.5; /* Affects entire element including text */\n}\n\n/* Overlay effects */\n.overlay-container {\n  position: relative;\n  overflow: hidden;\n}\n\n.overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.7);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n}\n\n.overlay-container:hover .overlay {\n  opacity: 1;\n}\n\n/* Loading state */\n.loading {\n  opacity: 0.5;\n  pointer-events: none;\n  position: relative;\n}\n\n.loading::after {\n  content: "Loading...";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: rgba(255, 255, 255, 0.9);\n  padding: 10px 20px;\n  border-radius: 4px;\n}\n\n/* Disabled state */\n.disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n/* Modal backdrop */\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n}\n\n.modal-backdrop.show {\n  opacity: 1;\n  visibility: visible;\n}\n\n/* Fade in animation */\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.fade-in {\n  animation: fadeIn 0.5s ease-in;\n}\n\n/* Pulse effect */\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n\n.pulse {\n  animation: pulse 2s infinite;\n}\n\n/* Cross-browser opacity (legacy) */\n.cross-browser-opacity {\n  opacity: 0.5;\n  filter: alpha(opacity=50); /* IE8 and earlier */\n  -moz-opacity: 0.5; /* Firefox < 0.9 */\n  -khtml-opacity: 0.5; /* Safari 1.x */\n}\n\n/* Tooltip with opacity */\n.tooltip-opacity {\n  position: relative;\n}\n\n.tooltip-opacity .tooltip-text {\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #333;\n  color: white;\n  padding: 8px 12px;\n  border-radius: 4px;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n}\n\n.tooltip-opacity:hover .tooltip-text {\n  opacity: 1;\n  visibility: visible;\n}'
             ]
           }
         ],
         questions: [
           {
             id: 1,
             question: "What is the purpose of CSS pseudo-elements?",
             options: [
               "To select HTML elements that don't exist",
               "To style specific parts of an element or insert content",
               "To create new HTML elements",
               "To replace CSS classes"
             ],
             correct: 1
           },
           {
             id: 2,
             question: "Which pseudo-element is used to style the first letter of a paragraph?",
             options: [
               "::first-line",
               "::first-letter",
               "::before",
               "::after"
             ],
             correct: 1
           },
           {
             id: 3,
             question: "What property is required when using ::before and ::after pseudo-elements?",
             options: [
               "display",
               "position",
               "content",
               "visibility"
             ],
             correct: 2
           },
           {
             id: 4,
             question: "What does opacity: 0.5 mean?",
             options: [
               "Element is fully visible",
               "Element is 50% transparent",
               "Element is fully transparent",
               "Element is 5% transparent"
             ],
             correct: 1
           },
           {
             id: 5,
             question: "What's the difference between opacity and RGBA transparency?",
             options: [
               "There is no difference",
               "Opacity affects the entire element, RGBA affects specific properties",
               "RGBA affects the entire element, opacity affects specific properties",
               "Both work exactly the same way"
             ],
             correct: 1
           },
           {
             id: 6,
             question: "Which opacity value makes an element completely invisible?",
             options: [
               "opacity: 1",
               "opacity: 0.5",
               "opacity: 0",
               "opacity: 100"
             ],
             correct: 2
           },
           {
             id: 7,
             question: "What does the ::selection pseudo-element style?",
             options: [
               "The first element selected",
               "All selected elements",
               "The text that user selects/highlights",
               "The last selected element"
             ],
             correct: 2
           },
           {
             id: 8,
             question: "How do you create a tooltip using pseudo-elements?",
             options: [
               "Using ::before or ::after with content property",
               "Using ::tooltip pseudo-element",
               "Using ::hover pseudo-element",
               "Using ::popup pseudo-element"
             ],
             correct: 0
           },
           {
             id: 9,
             question: "What is the default opacity value for elements?",
             options: [
               "0",
               "0.5",
               "1",
               "100"
             ],
             correct: 2
           },
           {
             id: 10,
             question: "Which is better for accessibility when creating disabled states?",
             options: [
               "Using display: none",
               "Using visibility: hidden",
               "Using opacity with proper ARIA attributes",
               "Using color: transparent"
             ],
             correct: 2
           }
         ]},
         'frontend-beginner-6': {
           id: 'frontend-beginner-6',
           title: 'JavaScript Part 1',
           description: 'Introduction to JavaScript programming including variables, operators, and basic concepts.',
           topics: [
             {
               id: 'js-introduction',
               title: 'JavaScript Introduction',
               content: `JavaScript is a programming language that adds interactivity to your website.

What is JavaScript?
JavaScript is a dynamic programming language that's used for web development, in web applications, for game development, and lots more. It allows you to implement dynamic features on web pages that cannot be done with only HTML and CSS.

What can JavaScript do?
• Change HTML content and attributes
• Change CSS styles
• Hide and show HTML elements
• Validate form data
• Create interactive features
• Handle user events (clicks, mouse movements, key presses)
• Communicate with servers (AJAX)
• Create animations and effects

Where to Place JavaScript:
JavaScript can be placed in three locations:
• Between <script> tags in HTML
• In external .js files
• Inline in HTML attributes (not recommended)

JavaScript vs Other Languages:
• Client-side language (runs in browser)
• Interpreted language (no compilation needed)
• Dynamically typed
• Case-sensitive
• Object-oriented and functional programming support

Browser Support:
JavaScript is supported by all modern web browsers including Chrome, Firefox, Safari, Edge, and Opera.

JavaScript Frameworks and Libraries:
• React, Vue, Angular (frameworks)
• jQuery, Lodash (libraries)
• Node.js (server-side JavaScript)`,
               syntax: '// JavaScript in HTML\n<script>\n  // JavaScript code goes here\n  console.log("Hello, World!");\n</script>\n\n// External JavaScript file\n<script src="script.js"></script>\n\n// Basic JavaScript syntax\nconsole.log("Hello, World!");\nalert("Welcome to JavaScript!");\ndocument.getElementById("demo").innerHTML = "Hello JavaScript!";',
               examples: [
                 '<!-- JavaScript in HTML head -->\n<!DOCTYPE html>\n<html>\n<head>\n  <script>\n    function myFunction() {\n      document.getElementById("demo").innerHTML = "Hello JavaScript!";\n    }\n  </script>\n</head>\n<body>\n  <h1>My Web Page</h1>\n  <p id="demo">A Paragraph</p>\n  <button type="button" onclick="myFunction()">Try it</button>\n</body>\n</html>\n\n<!-- JavaScript in HTML body -->\n<!DOCTYPE html>\n<html>\n<body>\n  <h1>My Web Page</h1>\n  <p id="demo">A Paragraph</p>\n  <button type="button" onclick="myFunction()">Try it</button>\n  \n  <script>\n    function myFunction() {\n      document.getElementById("demo").innerHTML = "Hello JavaScript!";\n    }\n  </script>\n</body>\n</html>\n\n<!-- External JavaScript -->\n<!DOCTYPE html>\n<html>\n<body>\n  <h1>My Web Page</h1>\n  <p id="demo">A Paragraph</p>\n  <button type="button" onclick="myFunction()">Try it</button>\n  \n  <script src="myScript.js"></script>\n</body>\n</html>\n\n// myScript.js file\nfunction myFunction() {\n  document.getElementById("demo").innerHTML = "Hello from external file!";\n}\n\n// Basic JavaScript examples\n// Display output\nconsole.log("Hello, World!"); // Console output\nalert("Hello, World!"); // Alert box\ndocument.write("Hello, World!"); // Write to document\n\n// Change HTML content\ndocument.getElementById("myHeading").innerHTML = "New Heading";\ndocument.getElementById("myParagraph").innerHTML = "New paragraph content";\n\n// Change HTML attributes\ndocument.getElementById("myImage").src = "new-image.jpg";\ndocument.getElementById("myLink").href = "https://example.com";\n\n// Change CSS styles\ndocument.getElementById("myElement").style.color = "red";\ndocument.getElementById("myElement").style.fontSize = "20px";\ndocument.getElementById("myElement").style.display = "none";\n\n// Event handling\nfunction buttonClick() {\n  alert("Button was clicked!");\n}\n\n// Multiple statements\nfunction changeContent() {\n  document.getElementById("demo1").innerHTML = "First change";\n  document.getElementById("demo2").innerHTML = "Second change";\n  document.getElementById("demo3").style.color = "blue";\n}\n\n// JavaScript comments\n// This is a single-line comment\n\n/*\nThis is a\nmulti-line comment\n*/\n\n// Case sensitivity demonstration\nvar myVariable = "Hello";\nvar myvariable = "World"; // Different variable\nvar MYVARIABLE = "JavaScript"; // Different variable\n\nconsole.log(myVariable); // "Hello"\nconsole.log(myvariable); // "World"\nconsole.log(MYVARIABLE); // "JavaScript"\n\n// JavaScript statements\nvar x = 5;\nvar y = 10;\nvar z = x + y;\ndocument.getElementById("result").innerHTML = z;\n\n// JavaScript expressions\n5 + 3 // Expression that evaluates to 8\n"Hello" + " " + "World" // Expression that evaluates to "Hello World"\nx * y // Expression using variables\n\n// JavaScript keywords (reserved words)\n// var, let, const, function, if, else, for, while, return, etc.\n\n// Best practices\n// Use meaningful variable names\nvar userName = "John";\nvar userAge = 25;\n\n// Use semicolons\nvar a = 5;\nvar b = 10;\n\n// Use proper indentation\nif (x > 5) {\n  console.log("x is greater than 5");\n}\n\n// Use comments to explain code\n// Calculate the area of a rectangle\nvar length = 10;\nvar width = 5;\nvar area = length * width; // Area = length × width'
               ]
             },
             {
               id: 'js-syntax',
               title: 'JavaScript Syntax',
               content: `JavaScript syntax is the set of rules that define a correctly structured JavaScript program.

JavaScript Statements:
A JavaScript program is a list of programming statements. Statements are executed by the browser in the sequence they are written.

Semicolons:
Semicolons separate JavaScript statements. It's good practice to add semicolons at the end of each statement.

JavaScript Code Blocks:
JavaScript statements can be grouped together in code blocks, inside curly brackets {...}.

JavaScript Keywords:
Keywords are reserved words that have special meaning in JavaScript and cannot be used as variable names.

JavaScript Comments:
Comments are used to explain code and make it more readable. They are ignored by the JavaScript engine.

JavaScript is Case Sensitive:
JavaScript treats uppercase and lowercase letters as different characters.

JavaScript Identifiers:
Identifiers are names used to identify variables, functions, and properties. They must begin with a letter, underscore (_), or dollar sign ($).

JavaScript Values:
JavaScript recognizes two types of values: fixed values (literals) and variable values (variables).

JavaScript Literals:
• Numbers: 10, 3.14
• Strings: "Hello", 'World'
• Booleans: true, false
• Arrays: [1, 2, 3]
• Objects: {name: "John", age: 30}

JavaScript Operators:
Operators are used to perform operations on variables and values.`,
               syntax: '// JavaScript statements\nvar x = 5;\nvar y = 10;\nvar z = x + y;\n\n// Code blocks\nif (x > 0) {\n  console.log("Positive number");\n  console.log("Greater than zero");\n}\n\n// Comments\n// Single-line comment\n/* Multi-line comment */\n\n// Case sensitivity\nvar myVar = "Hello";\nvar MyVar = "World"; // Different variable',
               examples: [
                 '// JavaScript Statements\nvar a = 5;                    // Statement 1\nvar b = 10;                   // Statement 2\nvar c = a + b;                // Statement 3\ndocument.getElementById("demo").innerHTML = c; // Statement 4\n\n// Semicolons (optional but recommended)\nvar x = 5; var y = 10; var z = x + y; // Multiple statements on one line\n\n// Without semicolons (automatic semicolon insertion)\nvar name = "John"\nvar age = 25\nvar city = "New York"\n\n// Code Blocks\nfunction myFunction() {\n  var x = 5;\n  var y = 10;\n  return x + y;\n}\n\nif (true) {\n  console.log("This is a code block");\n  console.log("Multiple statements in curly braces");\n}\n\n// JavaScript Keywords (reserved words)\n// break, case, catch, class, const, continue, debugger, default, delete\n// do, else, export, extends, false, finally, for, function, if, import\n// in, instanceof, let, new, null, return, super, switch, this, throw\n// true, try, typeof, var, void, while, with, yield\n\n// Examples of keyword usage\nvar myVariable = 5;           // var keyword\nfunction myFunction() {}      // function keyword\nif (true) {}                  // if keyword\nfor (var i = 0; i < 5; i++) {} // for keyword\nreturn "Hello";               // return keyword\n\n// Comments\n// This is a single-line comment\nvar x = 5; // Comment at end of line\n\n/*\nThis is a multi-line comment\nIt can span multiple lines\nUseful for longer explanations\n*/\n\nvar y = 10; /* Inline comment */ var z = 15;\n\n// Case Sensitivity Examples\nvar firstName = "John";       // Camel case\nvar FirstName = "Jane";       // Pascal case\nvar firstname = "Bob";        // Lowercase\nvar FIRSTNAME = "Alice";      // Uppercase\n\n// These are all different variables!\nconsole.log(firstName);       // "John"\nconsole.log(FirstName);       // "Jane"\nconsole.log(firstname);       // "Bob"\nconsole.log(FIRSTNAME);       // "Alice"\n\n// Function names are also case sensitive\nfunction myFunction() {\n  return "Hello";\n}\n\nfunction MyFunction() {\n  return "World";\n}\n\nconsole.log(myFunction());    // "Hello"\nconsole.log(MyFunction());    // "World"\n\n// JavaScript Identifiers\nvar validName1 = "Valid";     // Starts with letter\nvar _validName2 = "Valid";    // Starts with underscore\nvar $validName3 = "Valid";    // Starts with dollar sign\nvar valid123 = "Valid";       // Contains numbers\n\n// Invalid identifiers (will cause errors)\n// var 123invalid = "Invalid"; // Cannot start with number\n// var my-variable = "Invalid"; // Cannot contain hyphens\n// var my variable = "Invalid"; // Cannot contain spaces\n// var var = "Invalid"; // Cannot use keywords\n\n// JavaScript Literals\n// Number literals\nvar integer = 42;\nvar decimal = 3.14159;\nvar scientific = 1.23e5;      // 123000\nvar negative = -25;\n\n// String literals\nvar singleQuotes = \'Hello World\';\nvar doubleQuotes = "Hello World";\nvar templateLiteral = `Hello World`;\nvar escapedQuotes = "She said \\"Hello\\"";\n\n// Boolean literals\nvar isTrue = true;\nvar isFalse = false;\n\n// Array literals\nvar numbers = [1, 2, 3, 4, 5];\nvar mixed = [1, "Hello", true, null];\nvar empty = [];\n\n// Object literals\nvar person = {\n  name: "John",\n  age: 30,\n  city: "New York"\n};\n\nvar empty_object = {};\n\n// Special literals\nvar nothing = null;\nvar notDefined = undefined;\n\n// JavaScript Operators\n// Arithmetic operators\nvar sum = 5 + 3;              // Addition\nvar difference = 10 - 4;      // Subtraction\nvar product = 6 * 7;          // Multiplication\nvar quotient = 15 / 3;        // Division\nvar remainder = 17 % 5;       // Modulus\nvar power = 2 ** 3;           // Exponentiation\n\n// Assignment operators\nvar x = 10;                   // Assignment\nx += 5;                       // x = x + 5\nx -= 3;                       // x = x - 3\nx *= 2;                       // x = x * 2\nx /= 4;                       // x = x / 4\n\n// Comparison operators\nvar isEqual = (5 == "5");     // true (loose equality)\nvar isStrictEqual = (5 === "5"); // false (strict equality)\nvar isNotEqual = (5 != 3);    // true\nvar isGreater = (10 > 5);     // true\nvar isLess = (3 < 8);         // true\n\n// Logical operators\nvar and = (true && false);    // false\nvar or = (true || false);     // true\nvar not = !true;              // false\n\n// String operators\nvar greeting = "Hello" + " " + "World"; // "Hello World"\nvar name = "John";\nname += " Doe";               // "John Doe"\n\n// Increment/Decrement operators\nvar counter = 5;\ncounter++;                    // counter = 6 (post-increment)\n++counter;                    // counter = 7 (pre-increment)\ncounter--;                    // counter = 6 (post-decrement)\n--counter;                    // counter = 5 (pre-decrement)\n\n// Conditional (ternary) operator\nvar age = 18;\nvar status = (age >= 18) ? "Adult" : "Minor";\n\n// typeof operator\nconsole.log(typeof 42);       // "number"\nconsole.log(typeof "Hello");  // "string"\nconsole.log(typeof true);     // "boolean"\nconsole.log(typeof undefined); // "undefined"\nconsole.log(typeof null);     // "object" (this is a known quirk)\nconsole.log(typeof []);       // "object"\nconsole.log(typeof {});       // "object"\nconsole.log(typeof function(){}); // "function"\n\n// Whitespace and Line Breaks\n// JavaScript ignores extra whitespace\nvar x=5;                      // No spaces\nvar y = 10;                   // Spaces around operator\nvar z    =    15;             // Extra spaces\n\n// Line breaks for readability\nvar longCalculation = \n  (5 + 3) * \n  (10 - 2) / \n  4;\n\n// Object with line breaks\nvar person = {\n  firstName: "John",\n  lastName: "Doe",\n  age: 30,\n  city: "New York"\n};'
               ]
             },
             {
               id: 'js-variables',
               title: 'JavaScript Variables',
               content: `Variables are containers for storing data values. In JavaScript, you can declare variables using var, let, or const.

What are Variables?
Variables are used to store data that can be used and manipulated throughout your program. Think of them as labeled containers that hold values.

Variable Declaration:
Before using a variable, you need to declare it. JavaScript has three ways to declare variables:
• var - Function-scoped or globally-scoped
• let - Block-scoped (ES6+)
• const - Block-scoped, cannot be reassigned (ES6+)

Variable Naming Rules:
• Must begin with a letter, underscore (_), or dollar sign ($)
• Can contain letters, numbers, underscores, and dollar signs
• Cannot contain spaces or special characters
• Cannot be JavaScript keywords
• Case-sensitive

Variable Naming Conventions:
• Use camelCase for variable names (firstName, lastName)
• Use descriptive names (userName instead of un)
• Use UPPER_CASE for constants
• Avoid single-letter names except for loops

Variable Scope:
• Global scope - accessible everywhere
• Function scope - accessible within function
• Block scope - accessible within block (let and const)

Hoisting:
JavaScript moves variable declarations to the top of their scope. var variables are hoisted and initialized with undefined, let and const are hoisted but not initialized.

Data Types:
Variables can store different types of data:
• Numbers, Strings, Booleans, Objects, Arrays, Functions, undefined, null`,
               syntax: '// Variable declaration\nvar name;\nlet age;\nconst PI = 3.14159;\n\n// Variable assignment\nname = "John";\nage = 25;\n\n// Declaration and assignment\nvar city = "New York";\nlet country = "USA";\nconst GRAVITY = 9.81;',
               examples: [
                 '// Variable Declaration with var\nvar firstName;                // Declaration\nfirstName = "John";          // Assignment\nvar lastName = "Doe";        // Declaration and assignment\n\n// Variable Declaration with let (ES6+)\nlet userAge;                 // Declaration\nuserAge = 25;               // Assignment\nlet userCity = "New York";   // Declaration and assignment\n\n// Variable Declaration with const (ES6+)\nconst PI = 3.14159;         // Must be initialized\nconst COMPANY_NAME = "Tech Corp";\nconst MAX_USERS = 100;\n\n// Multiple variable declarations\nvar a, b, c;                // Multiple declarations\nvar x = 5, y = 10, z = 15;  // Multiple declarations with assignment\n\nlet firstName, lastName, email;\nlet name = "John", age = 30, city = "Boston";\n\n// Variable naming examples\n// Valid variable names\nvar userName = "john123";\nvar user_name = "jane456";\nvar $price = 99.99;\nvar _count = 0;\nvar firstName2 = "Bob";\nvar isLoggedIn = true;\nvar HTML5 = "markup language";\n\n// Invalid variable names (will cause errors)\n// var 2names = "Invalid";     // Cannot start with number\n// var user-name = "Invalid";  // Cannot contain hyphens\n// var user name = "Invalid";  // Cannot contain spaces\n// var var = "Invalid";        // Cannot use keywords\n// var function = "Invalid";   // Cannot use keywords\n\n// Naming conventions\nvar firstName = "John";      // camelCase (recommended)\nvar first_name = "Jane";     // snake_case\nvar FirstName = "Bob";       // PascalCase\nvar FIRST_NAME = "Alice";    // UPPER_CASE (for constants)\n\n// Descriptive variable names\nvar userName = "john_doe";           // Good\nvar un = "john_doe";                 // Poor\n\nvar totalPrice = 99.99;              // Good\nvar tp = 99.99;                      // Poor\n\nvar isUserLoggedIn = true;           // Good\nvar flag = true;                     // Poor\n\n// Variable scope examples\n// Global scope\nvar globalVar = "I am global";\n\nfunction testScope() {\n  // Function scope\n  var functionVar = "I am function-scoped";\n  \n  if (true) {\n    // Block scope\n    var varInBlock = "var is function-scoped";\n    let letInBlock = "let is block-scoped";\n    const constInBlock = "const is block-scoped";\n    \n    console.log(varInBlock);     // Accessible\n    console.log(letInBlock);     // Accessible\n    console.log(constInBlock);   // Accessible\n  }\n  \n  console.log(varInBlock);       // Accessible (var is function-scoped)\n  // console.log(letInBlock);    // Error: not accessible\n  // console.log(constInBlock);  // Error: not accessible\n}\n\n// Hoisting examples\nconsole.log(hoistedVar);       // undefined (not error)\nvar hoistedVar = "I am hoisted";\n\n// console.log(notHoisted);    // Error: Cannot access before initialization\nlet notHoisted = "I am not hoisted";\n\n// Variable reassignment\nvar changeable = "Original value";\nchangeable = "New value";        // OK with var\n\nlet alsoChangeable = "Original";\nalsoChangeable = "New value";    // OK with let\n\nconst notChangeable = "Original";\n// notChangeable = "New";        // Error: Cannot reassign const\n\n// However, const objects and arrays can be modified\nconst person = {\n  name: "John",\n  age: 30\n};\nperson.name = "Jane";            // OK: modifying property\nperson.city = "Boston";          // OK: adding property\n\nconst numbers = [1, 2, 3];\nnumbers.push(4);                 // OK: modifying array\nnumbers[0] = 10;                 // OK: changing element\n\n// Data types in variables\nvar numberVar = 42;              // Number\nvar stringVar = "Hello World";   // String\nvar booleanVar = true;           // Boolean\nvar arrayVar = [1, 2, 3];        // Array (object)\nvar objectVar = {name: "John"};  // Object\nvar functionVar = function() {}; // Function\nvar undefinedVar;                // undefined\nvar nullVar = null;              // null\n\n// Dynamic typing\nvar dynamicVar = 42;             // Number\ndynamicVar = "Now I am string";  // String\ndynamicVar = true;               // Boolean\ndynamicVar = [1, 2, 3];          // Array\n\n// Variable initialization\nvar initialized = "I have a value";\nvar uninitialized;               // undefined\n\nconsole.log(initialized);        // "I have a value"\nconsole.log(uninitialized);      // undefined\n\n// Best practices\n// 1. Always declare variables before using them\nvar properlyDeclared = "Good practice";\n\n// 2. Use const for values that won\'t change\nconst API_URL = "https://api.example.com";\nconst MAX_RETRY_ATTEMPTS = 3;\n\n// 3. Use let for variables that will change\nlet counter = 0;\nlet currentUser = null;\n\n// 4. Avoid var in modern JavaScript (use let/const instead)\n// var oldStyle = "Avoid this";     // Old style\nlet modernStyle = "Use this";       // Modern style\n\n// 5. Initialize variables when possible\nlet userName = "";               // Better than let userName;\nlet userAge = 0;                 // Better than let userAge;\nlet isActive = false;            // Better than let isActive;\n\n// 6. Group related variable declarations\nlet firstName = "John";\nlet lastName = "Doe";\nlet email = "john.doe@email.com";\n\n// Or\nlet firstName2 = "Jane",\n    lastName2 = "Smith",\n    email2 = "jane.smith@email.com";\n\n// Variable swapping\nlet a = 5;\nlet b = 10;\n\n// Traditional way\nlet temp = a;\na = b;\nb = temp;\nconsole.log(a, b);               // 10, 5\n\n// ES6 destructuring way\nlet x = 15;\nlet y = 20;\n[x, y] = [y, x];\nconsole.log(x, y);               // 20, 15'
               ]
             },
             {
               id: 'js-operators',
               title: 'JavaScript Operators',
               content: `Operators are used to perform operations on variables and values. JavaScript has several types of operators.

Types of Operators:
• Arithmetic operators - perform mathematical operations
• Assignment operators - assign values to variables
• Comparison operators - compare values
• Logical operators - perform logical operations
• String operators - work with strings
• Conditional operator - shorthand for if-else
• Type operators - check or convert types

Arithmetic Operators:
• + (addition)
• - (subtraction)
• * (multiplication)
• / (division)
• % (modulus/remainder)
• ** (exponentiation)
• ++ (increment)
• -- (decrement)

Assignment Operators:
• = (assignment)
• += (addition assignment)
• -= (subtraction assignment)
• *= (multiplication assignment)
• /= (division assignment)
• %= (modulus assignment)

Comparison Operators:
• == (equal to)
• === (strict equal to)
• != (not equal to)
• !== (strict not equal to)
• > (greater than)
• < (less than)
• >= (greater than or equal to)
• <= (less than or equal to)

Logical Operators:
• && (logical AND)
• || (logical OR)
• ! (logical NOT)

Operator Precedence:
Operators have different precedence levels that determine the order of evaluation.`,
               syntax: '// Arithmetic operators\nvar sum = 5 + 3;        // 8\nvar product = 4 * 6;    // 24\nvar remainder = 10 % 3; // 1\n\n// Assignment operators\nvar x = 10;\nx += 5;                 // x = 15\n\n// Comparison operators\nvar isEqual = (5 == "5");   // true\nvar isStrictEqual = (5 === "5"); // false\n\n// Logical operators\nvar result = (true && false); // false',
               examples: [
                 '// Arithmetic Operators\nvar a = 10;\nvar b = 3;\n\nvar addition = a + b;        // 13\nvar subtraction = a - b;     // 7\nvar multiplication = a * b;  // 30\nvar division = a / b;        // 3.333...\nvar modulus = a % b;         // 1 (remainder)\nvar exponentiation = a ** b; // 1000 (10^3)\n\n// Increment and Decrement\nvar counter = 5;\ncounter++;                   // counter = 6 (post-increment)\n++counter;                   // counter = 7 (pre-increment)\ncounter--;                   // counter = 6 (post-decrement)\n--counter;                   // counter = 5 (pre-decrement)\n\n// Difference between pre and post increment\nvar x = 5;\nvar y = x++;                 // y = 5, x = 6 (post-increment)\nvar z = ++x;                 // z = 7, x = 7 (pre-increment)\n\n// String arithmetic\nvar str1 = "Hello";\nvar str2 = "World";\nvar greeting = str1 + " " + str2; // "Hello World"\n\n// Mixed types\nvar num = 5;\nvar str = "10";\nvar result1 = num + str;     // "510" (string concatenation)\nvar result2 = num + Number(str); // 15 (numeric addition)\n\n// Assignment Operators\nvar value = 100;\n\nvalue += 20;                 // value = 120 (same as value = value + 20)\nvalue -= 30;                 // value = 90  (same as value = value - 30)\nvalue *= 2;                  // value = 180 (same as value = value * 2)\nvalue /= 3;                  // value = 60  (same as value = value / 3)\nvalue %= 7;                  // value = 4   (same as value = value % 7)\nvalue **= 2;                 // value = 16  (same as value = value ** 2)\n\n// Comparison Operators\nvar num1 = 10;\nvar num2 = "10";\nvar num3 = 20;\n\n// Equality\nconsole.log(num1 == num2);   // true  (loose equality, type coercion)\nconsole.log(num1 === num2);  // false (strict equality, no type coercion)\nconsole.log(num1 == 10);     // true\nconsole.log(num1 === 10);    // true\n\n// Inequality\nconsole.log(num1 != num2);   // false (loose inequality)\nconsole.log(num1 !== num2);  // true  (strict inequality)\nconsole.log(num1 != 5);      // true\nconsole.log(num1 !== 5);     // true\n\n// Relational\nconsole.log(num1 > num3);    // false (10 > 20)\nconsole.log(num1 < num3);    // true  (10 < 20)\nconsole.log(num1 >= 10);     // true  (10 >= 10)\nconsole.log(num1 <= 10);     // true  (10 <= 10)\n\n// String comparison\nconsole.log("apple" < "banana");  // true (alphabetical order)\nconsole.log("Apple" < "apple");   // true (uppercase comes first)\n\n// Logical Operators\nvar isAdult = true;\nvar hasLicense = false;\nvar hasInsurance = true;\n\n// AND operator (&&)\nvar canDrive = isAdult && hasLicense;           // false\nvar canDriveInsured = isAdult && hasInsurance;  // true\nvar allConditions = isAdult && hasLicense && hasInsurance; // false\n\n// OR operator (||)\nvar hasDocument = hasLicense || hasInsurance;   // true\nvar canEnter = isAdult || hasLicense;           // true\n\n// NOT operator (!)\nvar isMinor = !isAdult;                         // false\nvar noLicense = !hasLicense;                    // true\nvar notAllowed = !(isAdult && hasLicense);      // true\n\n// Short-circuit evaluation\nvar user = null;\nvar name = user && user.name;                   // null (short-circuit)\nvar defaultName = name || "Guest";              // "Guest"\n\n// Logical operators with non-boolean values\nconsole.log(5 && 3);         // 3 (returns last truthy value)\nconsole.log(0 && 3);         // 0 (returns first falsy value)\nconsole.log(5 || 3);         // 5 (returns first truthy value)\nconsole.log(0 || 3);         // 3 (returns first truthy value)\n\n// String Operators\nvar firstName = "John";\nvar lastName = "Doe";\nvar fullName = firstName + " " + lastName;      // "John Doe"\n\n// String concatenation with +=\nvar message = "Hello";\nmessage += " ";\nmessage += "World";\nmessage += "!";                                 // "Hello World!"\n\n// Template literals (ES6)\nvar age = 25;\nvar greeting = `Hello, my name is ${firstName} and I am ${age} years old.`;\n\n// Conditional (Ternary) Operator\nvar age = 18;\nvar status = (age >= 18) ? "Adult" : "Minor";   // "Adult"\n\nvar score = 85;\nvar grade = (score >= 90) ? "A" : \n           (score >= 80) ? "B" : \n           (score >= 70) ? "C" : \n           (score >= 60) ? "D" : "F";           // "B"\n\n// Type Operators\nvar num = 42;\nvar str = "Hello";\nvar bool = true;\nvar arr = [1, 2, 3];\nvar obj = {name: "John"};\nvar func = function() {};\nvar nothing = null;\nvar notDefined;\n\nconsole.log(typeof num);     // "number"\nconsole.log(typeof str);     // "string"\nconsole.log(typeof bool);    // "boolean"\nconsole.log(typeof arr);     // "object"\nconsole.log(typeof obj);     // "object"\nconsole.log(typeof func);    // "function"\nconsole.log(typeof nothing); // "object" (known quirk)\nconsole.log(typeof notDefined); // "undefined"\n\n// instanceof operator\nconsole.log(arr instanceof Array);   // true\nconsole.log(obj instanceof Object);  // true\nconsole.log(str instanceof String);  // false (primitive)\nconsole.log(new String("hello") instanceof String); // true (object)\n\n// Operator Precedence (from highest to lowest)\n// 1. Grouping: ()\n// 2. Member access: . []\n// 3. Function call: ()\n// 4. Postfix increment/decrement: ++ --\n// 5. Prefix increment/decrement, unary: ++ -- + - ! typeof\n// 6. Exponentiation: **\n// 7. Multiplication, division, modulus: * / %\n// 8. Addition, subtraction: + -\n// 9. Relational: < <= > >=\n// 10. Equality: == != === !==\n// 11. Logical AND: &&\n// 12. Logical OR: ||\n// 13. Conditional: ? :\n// 14. Assignment: = += -= *= /= %= **=\n\n// Precedence examples\nvar result1 = 2 + 3 * 4;     // 14 (not 20, multiplication first)\nvar result2 = (2 + 3) * 4;   // 20 (parentheses override precedence)\nvar result3 = 10 / 2 * 3;    // 15 (left-to-right for same precedence)\nvar result4 = 2 ** 3 ** 2;   // 512 (right-to-left for exponentiation)\n\n// Complex expressions\nvar a = 5;\nvar b = 10;\nvar c = 15;\nvar complex = a + b * c / 5 - 2;  // 5 + (10 * 15 / 5) - 2 = 5 + 30 - 2 = 33\n\n// Bitwise Operators (less commonly used)\nvar x = 5;  // Binary: 101\nvar y = 3;  // Binary: 011\n\nconsole.log(x & y);   // 1 (AND: 001)\nconsole.log(x | y);   // 7 (OR:  111)\nconsole.log(x ^ y);   // 6 (XOR: 110)\nconsole.log(~x);      // -6 (NOT)\nconsole.log(x << 1);  // 10 (Left shift)\nconsole.log(x >> 1);  // 2 (Right shift)\n\n// Comma Operator\nvar a, b, c;\na = (b = 5, c = 10, b + c);  // a = 15, b = 5, c = 10\n\n// Practical examples\n// Swapping variables\nvar temp;\nvar x = 10, y = 20;\ntemp = x;\nx = y;\ny = temp;\nconsole.log(x, y);    // 20, 10\n\n// Finding maximum\nvar max = (a > b) ? a : b;\n\n// Default values\nvar username = inputName || "Guest";\n\n// Validation\nvar isValid = (age >= 18) && (email.includes("@")) && (password.length >= 8);\n\n// Calculations\nvar area = Math.PI * radius ** 2;\nvar compound = principal * (1 + rate / 100) ** years;'
               ]
             }
           ],
           questions: [
             {
               id: 1,
               question: "What are the three ways to include JavaScript in an HTML document?",
               options: [
                 "Internal, external, and inline",
                 "Head, body, and footer",
                 "Script, link, and style",
                 "Function, variable, and object"
               ],
               correct: 0
             },
             {
               id: 2,
               question: "Which of the following is the correct way to declare a variable in JavaScript?",
               options: [
                 "variable myVar = 5;",
                 "var myVar = 5;",
                 "declare myVar = 5;",
                 "int myVar = 5;"
               ],
               correct: 1
             },
             {
               id: 3,
               question: "What is the difference between '==' and '===' in JavaScript?",
               options: [
                 "No difference, they work the same",
                 "== checks type and value, === checks only value",
                 "== checks only value, === checks type and value",
                 "== is for numbers, === is for strings"
               ],
               correct: 2
             },
             {
               id: 4,
               question: "Which keyword is used to declare a constant in JavaScript?",
               options: [
                 "var",
                 "let",
                 "const",
                 "constant"
               ],
               correct: 2
             },
             {
               id: 5,
               question: "What does the '++' operator do in JavaScript?",
               options: [
                 "Adds two numbers",
                 "Increments a variable by 1",
                 "Concatenates strings",
                 "Compares two values"
               ],
               correct: 1
             },
             {
               id: 6,
               question: "Which of the following is NOT a valid JavaScript variable name?",
               options: [
                 "myVariable",
                 "_myVariable",
                 "$myVariable",
                 "2myVariable"
               ],
               correct: 3
             },
             {
               id: 7,
               question: "What is the result of '5' + 3 in JavaScript?",
               options: [
                 "8",
                 "53",
                 "Error",
                 "undefined"
               ],
               correct: 1
             },
             {
               id: 8,
               question: "Which operator is used for logical AND in JavaScript?",
               options: [
                 "&",
                 "&&",
                 "AND",
                 "and"
               ],
               correct: 1
             },
             {
               id: 9,
               question: "What is the scope of a variable declared with 'let'?",
               options: [
                 "Global scope",
                 "Function scope",
                 "Block scope",
                 "No scope"
               ],
               correct: 2
             },
             {
               id: 10,
               question: "Which of the following is the correct syntax for a single-line comment in JavaScript?",
               options: [
                 "<!-- This is a comment -->",
                 "/* This is a comment */",
                 "// This is a comment",
                 "# This is a comment"
               ],
               correct: 2
             }
           ]
         },
         'frontend-beginner-7': {
           id: 'frontend-beginner-7',
           title: 'JavaScript Part 2',
           description: 'Advanced JavaScript concepts including functions, arrays, objects, and event handling.',
           topics: [
             {
               id: 'js-functions',
               title: 'JavaScript Functions',
               content: `Functions are blocks of code designed to perform a particular task. A function is executed when "something" invokes it (calls it).

What is a Function?
A function is a block of code that performs a specific task. Functions allow you to write reusable code that can be called multiple times with different inputs.

Function Declaration:
A function declaration defines a named function with the specified parameters.

Function Expression:
A function expression defines a function inside an expression instead of a function declaration.

Arrow Functions (ES6):
Arrow functions provide a shorter syntax for writing functions and automatically bind the 'this' context.

Function Parameters:
Parameters are variables listed as part of the function definition. Arguments are the actual values passed to the function when it is called.

Return Statement:
The return statement stops the execution of a function and returns a value from that function.

Local Variables:
Variables declared inside a function are local to that function and cannot be accessed from outside.

Function Hoisting:
Function declarations are hoisted, meaning they can be called before they are defined in the code.

Anonymous Functions:
Functions without a name, often used as arguments to other functions.

Callback Functions:
Functions passed as arguments to other functions and executed at a later time.

Higher-Order Functions:
Functions that take other functions as arguments or return functions.`,
               syntax: '// Function declaration\nfunction functionName(parameter1, parameter2) {\n  // code to be executed\n  return result;\n}\n\n// Function expression\nvar myFunction = function(parameter1, parameter2) {\n  // code to be executed\n  return result;\n};\n\n// Arrow function (ES6)\nconst myArrowFunction = (parameter1, parameter2) => {\n  // code to be executed\n  return result;\n};',
               examples: [
                 '// Function Declaration\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\n// Calling the function\nvar message = greet("John");\nconsole.log(message); // "Hello, John!"\n\n// Function with multiple parameters\nfunction addNumbers(a, b) {\n  return a + b;\n}\n\nvar sum = addNumbers(5, 3);\nconsole.log(sum); // 8\n\n// Function without parameters\nfunction sayHello() {\n  return "Hello, World!";\n}\n\nconsole.log(sayHello()); // "Hello, World!"\n\n// Function with default parameters (ES6)\nfunction greetWithDefault(name = "Guest") {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greetWithDefault()); // "Hello, Guest!"\nconsole.log(greetWithDefault("Alice")); // "Hello, Alice!"\n\n// Function Expression\nvar multiply = function(x, y) {\n  return x * y;\n};\n\nconsole.log(multiply(4, 5)); // 20\n\n// Arrow Functions (ES6)\n// Single parameter, single expression\nconst square = x => x * x;\nconsole.log(square(4)); // 16\n\n// Multiple parameters\nconst add = (a, b) => a + b;\nconsole.log(add(3, 7)); // 10\n\n// Multiple statements\nconst calculateArea = (length, width) => {\n  const area = length * width;\n  return area;\n};\n\nconsole.log(calculateArea(5, 3)); // 15\n\n// No parameters\nconst getCurrentTime = () => {\n  return new Date().toLocaleTimeString();\n};\n\nconsole.log(getCurrentTime());\n\n// Function with local variables\nfunction calculateCircleArea(radius) {\n  const pi = 3.14159; // Local variable\n  const area = pi * radius * radius;\n  return area;\n}\n\nconsole.log(calculateCircleArea(5)); // 78.53975\n// console.log(pi); // Error: pi is not defined outside function\n\n// Function hoisting example\nconsole.log(hoistedFunction()); // "I am hoisted!"\n\nfunction hoistedFunction() {\n  return "I am hoisted!";\n}\n\n// Function expressions are not hoisted\n// console.log(notHoisted()); // Error: Cannot access before initialization\nvar notHoisted = function() {\n  return "I am not hoisted!";\n};\n\n// Anonymous function as event handler\ndocument.getElementById("myButton").onclick = function() {\n  alert("Button clicked!");\n};\n\n// Anonymous function with setTimeout\nsetTimeout(function() {\n  console.log("This runs after 2 seconds");\n}, 2000);\n\n// Callback functions\nfunction processUserInput(callback) {\n  var name = prompt("Please enter your name:");\n  callback(name);\n}\n\nprocessUserInput(function(name) {\n  console.log("Hello, " + name + "!");\n});\n\n// Higher-order function example\nfunction createMultiplier(multiplier) {\n  return function(x) {\n    return x * multiplier;\n  };\n}\n\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\n\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15\n\n// Array methods with callback functions\nvar numbers = [1, 2, 3, 4, 5];\n\n// map() - transforms each element\nvar doubled = numbers.map(function(num) {\n  return num * 2;\n});\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\n// filter() - filters elements based on condition\nvar evenNumbers = numbers.filter(function(num) {\n  return num % 2 === 0;\n});\nconsole.log(evenNumbers); // [2, 4]\n\n// reduce() - reduces array to single value\nvar sum = numbers.reduce(function(total, num) {\n  return total + num;\n}, 0);\nconsole.log(sum); // 15\n\n// Arrow functions with array methods\nvar squares = numbers.map(num => num * num);\nconsole.log(squares); // [1, 4, 9, 16, 25]\n\nvar greaterThanThree = numbers.filter(num => num > 3);\nconsole.log(greaterThanThree); // [4, 5]\n\n// Function with rest parameters (ES6)\nfunction sumAll(...numbers) {\n  return numbers.reduce((total, num) => total + num, 0);\n}\n\nconsole.log(sumAll(1, 2, 3, 4, 5)); // 15\nconsole.log(sumAll(10, 20)); // 30\n\n// Function with destructuring parameters\nfunction displayPerson({name, age, city}) {\n  console.log(`Name: ${name}, Age: ${age}, City: ${city}`);\n}\n\nconst person = {name: "John", age: 30, city: "New York"};\ndisplayPerson(person);\n\n// Immediately Invoked Function Expression (IIFE)\n(function() {\n  console.log("This function runs immediately!");\n})();\n\n// IIFE with parameters\n(function(name) {\n  console.log("Hello, " + name + "!");\n})("World");\n\n// Recursive function\nfunction factorial(n) {\n  if (n <= 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5)); // 120\n\n// Function as object method\nvar calculator = {\n  add: function(a, b) {\n    return a + b;\n  },\n  subtract: function(a, b) {\n    return a - b;\n  },\n  multiply: function(a, b) {\n    return a * b;\n  },\n  divide: function(a, b) {\n    return b !== 0 ? a / b : "Cannot divide by zero";\n  }\n};\n\nconsole.log(calculator.add(10, 5)); // 15\nconsole.log(calculator.divide(10, 0)); // "Cannot divide by zero"\n\n// Function constructor (less common)\nvar myFunction = new Function("a", "b", "return a + b");\nconsole.log(myFunction(3, 4)); // 7\n\n// Closures\nfunction outerFunction(x) {\n  return function(y) {\n    return x + y;\n  };\n}\n\nvar addFive = outerFunction(5);\nconsole.log(addFive(3)); // 8\n\n// Function with error handling\nfunction safeDivide(a, b) {\n  try {\n    if (b === 0) {\n      throw new Error("Division by zero is not allowed");\n    }\n    return a / b;\n  } catch (error) {\n    console.error(error.message);\n    return null;\n  }\n}\n\nconsole.log(safeDivide(10, 2)); // 5\nconsole.log(safeDivide(10, 0)); // null (with error message)\n\n// Function with variable number of arguments (arguments object)\nfunction sumAllArguments() {\n  var total = 0;\n  for (var i = 0; i < arguments.length; i++) {\n    total += arguments[i];\n  }\n  return total;\n}\n\nconsole.log(sumAllArguments(1, 2, 3, 4)); // 10\nconsole.log(sumAllArguments(5, 10)); // 15'
               ]
             },
             {
               id: 'js-events',
               title: 'JavaScript Events',
               content: `HTML events are "things" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can "react" on these events.

What are Events?
Events are actions that can be detected by JavaScript. Events can be user actions (like clicking a button) or browser actions (like loading a page).

Common HTML Events:
• onclick - when user clicks on an element
• onload - when page has finished loading
• onmouseover - when mouse pointer moves over an element
• onmouseout - when mouse pointer moves away from element
• onchange - when content of form element changes
• onsubmit - when form is submitted
• onkeydown - when user presses a key
• onkeyup - when user releases a key

Event Handlers:
Event handlers are JavaScript functions that are executed when an event occurs.

Adding Event Handlers:
• HTML attribute: onclick="myFunction()"
• DOM property: element.onclick = myFunction
• addEventListener method: element.addEventListener("click", myFunction)

Event Object:
When an event occurs, an event object is created containing information about the event.

Event Propagation:
Events can bubble up or capture down through the DOM tree.

Preventing Default Behavior:
You can prevent the default action of an event using preventDefault().

Event Delegation:
Using a single event listener to handle events for multiple elements.`,
               syntax: '// HTML attribute method\n<button onclick="myFunction()">Click me</button>\n\n// DOM property method\nelement.onclick = function() {\n  // code to execute\n};\n\n// addEventListener method\nelement.addEventListener("click", function() {\n  // code to execute\n});',
               examples: [
                 '// HTML Event Attributes\n// In HTML:\n// <button onclick="displayAlert()">Click Me</button>\n// <input type="text" onchange="textChanged()">\n// <body onload="pageLoaded()">\n\nfunction displayAlert() {\n  alert("Button was clicked!");\n}\n\nfunction textChanged() {\n  console.log("Text input changed");\n}\n\nfunction pageLoaded() {\n  console.log("Page has loaded");\n}\n\n// DOM Property Method\nvar button = document.getElementById("myButton");\nbutton.onclick = function() {\n  alert("Button clicked using DOM property!");\n};\n\n// Multiple event handlers with DOM properties (overwrites previous)\nbutton.onclick = function() {\n  console.log("This overwrites the previous handler");\n};\n\n// addEventListener Method (Recommended)\nvar button2 = document.getElementById("myButton2");\n\n// Single event listener\nbutton2.addEventListener("click", function() {\n  alert("Button clicked using addEventListener!");\n});\n\n// Multiple event listeners (both will execute)\nbutton2.addEventListener("click", function() {\n  console.log("First click handler");\n});\n\nbutton2.addEventListener("click", function() {\n  console.log("Second click handler");\n});\n\n// Named function as event handler\nfunction handleButtonClick() {\n  console.log("Named function handler");\n}\n\nbutton2.addEventListener("click", handleButtonClick);\n\n// Mouse Events\nvar element = document.getElementById("myElement");\n\nelement.addEventListener("mouseover", function() {\n  this.style.backgroundColor = "yellow";\n});\n\nelement.addEventListener("mouseout", function() {\n  this.style.backgroundColor = "";\n});\n\nelement.addEventListener("mousedown", function() {\n  console.log("Mouse button pressed");\n});\n\nelement.addEventListener("mouseup", function() {\n  console.log("Mouse button released");\n});\n\nelement.addEventListener("mousemove", function(event) {\n  console.log("Mouse position: " + event.clientX + ", " + event.clientY);\n});\n\n// Keyboard Events\nvar textInput = document.getElementById("textInput");\n\ntextInput.addEventListener("keydown", function(event) {\n  console.log("Key pressed: " + event.key);\n  console.log("Key code: " + event.keyCode);\n});\n\ntextInput.addEventListener("keyup", function(event) {\n  console.log("Key released: " + event.key);\n});\n\ntextInput.addEventListener("keypress", function(event) {\n  console.log("Key character: " + String.fromCharCode(event.charCode));\n});\n\n// Form Events\nvar form = document.getElementById("myForm");\nvar input = document.getElementById("myInput");\n\nform.addEventListener("submit", function(event) {\n  event.preventDefault(); // Prevent form submission\n  console.log("Form submitted");\n  \n  // Validate form\n  if (input.value === "") {\n    alert("Please fill in the input field");\n    return false;\n  }\n  \n  // Process form data\n  console.log("Input value: " + input.value);\n});\n\ninput.addEventListener("change", function() {\n  console.log("Input changed to: " + this.value);\n});\n\ninput.addEventListener("focus", function() {\n  this.style.backgroundColor = "lightblue";\n});\n\ninput.addEventListener("blur", function() {\n  this.style.backgroundColor = "";\n});\n\n// Window Events\nwindow.addEventListener("load", function() {\n  console.log("Page fully loaded");\n});\n\nwindow.addEventListener("resize", function() {\n  console.log("Window resized to: " + window.innerWidth + "x" + window.innerHeight);\n});\n\nwindow.addEventListener("scroll", function() {\n  console.log("Page scrolled");\n});\n\n// Event Object Properties\nbutton.addEventListener("click", function(event) {\n  console.log("Event type: " + event.type);\n  console.log("Target element: " + event.target.tagName);\n  console.log("Current target: " + event.currentTarget.tagName);\n  console.log("Mouse coordinates: " + event.clientX + ", " + event.clientY);\n  console.log("Timestamp: " + event.timeStamp);\n});\n\n// Preventing Default Behavior\nvar link = document.getElementById("myLink");\nlink.addEventListener("click", function(event) {\n  event.preventDefault();\n  console.log("Link click prevented");\n});\n\n// Preventing form submission\nform.addEventListener("submit", function(event) {\n  event.preventDefault();\n  console.log("Form submission prevented");\n});\n\n// Stopping Event Propagation\nvar parent = document.getElementById("parent");\nvar child = document.getElementById("child");\n\nparent.addEventListener("click", function() {\n  console.log("Parent clicked");\n});\n\nchild.addEventListener("click", function(event) {\n  event.stopPropagation(); // Prevents bubbling to parent\n  console.log("Child clicked");\n});\n\n// Event Bubbling Example\nvar grandparent = document.getElementById("grandparent");\nvar parent2 = document.getElementById("parent2");\nvar child2 = document.getElementById("child2");\n\ngrandparent.addEventListener("click", function() {\n  console.log("Grandparent clicked");\n});\n\nparent2.addEventListener("click", function() {\n  console.log("Parent clicked");\n});\n\nchild2.addEventListener("click", function() {\n  console.log("Child clicked");\n});\n// Clicking child2 will log: "Child clicked", "Parent clicked", "Grandparent clicked"\n\n// Event Capturing (useCapture = true)\ngrandparent.addEventListener("click", function() {\n  console.log("Grandparent clicked (capture)");\n}, true);\n\nparent2.addEventListener("click", function() {\n  console.log("Parent clicked (capture)");\n}, true);\n\nchild2.addEventListener("click", function() {\n  console.log("Child clicked (capture)");\n}, true);\n// With capture: "Grandparent clicked (capture)", "Parent clicked (capture)", "Child clicked (capture)"\n\n// Event Delegation\nvar list = document.getElementById("myList");\n\n// Instead of adding event listeners to each list item\nlist.addEventListener("click", function(event) {\n  if (event.target.tagName === "LI") {\n    console.log("List item clicked: " + event.target.textContent);\n    event.target.style.backgroundColor = "yellow";\n  }\n});\n\n// Dynamically add list items (event delegation still works)\nfunction addListItem(text) {\n  var li = document.createElement("li");\n  li.textContent = text;\n  list.appendChild(li);\n}\n\n// Custom Events\nvar customEvent = new CustomEvent("myCustomEvent", {\n  detail: {\n    message: "Hello from custom event!",\n    timestamp: Date.now()\n  }\n});\n\nelement.addEventListener("myCustomEvent", function(event) {\n  console.log("Custom event received: " + event.detail.message);\n});\n\n// Dispatch custom event\nelement.dispatchEvent(customEvent);\n\n// Removing Event Listeners\nfunction temporaryHandler() {\n  console.log("This handler will be removed");\n}\n\nbutton.addEventListener("click", temporaryHandler);\n\n// Remove the event listener\nsetTimeout(function() {\n  button.removeEventListener("click", temporaryHandler);\n  console.log("Event listener removed");\n}, 5000);\n\n// Touch Events (for mobile)\nvar touchElement = document.getElementById("touchElement");\n\ntouchElement.addEventListener("touchstart", function(event) {\n  console.log("Touch started");\n  event.preventDefault(); // Prevent scrolling\n});\n\ntouchElement.addEventListener("touchmove", function(event) {\n  console.log("Touch moved");\n});\n\ntouchElement.addEventListener("touchend", function(event) {\n  console.log("Touch ended");\n});\n\n// Drag and Drop Events\nvar draggable = document.getElementById("draggable");\nvar dropzone = document.getElementById("dropzone");\n\ndraggable.addEventListener("dragstart", function(event) {\n  event.dataTransfer.setData("text/plain", event.target.id);\n  console.log("Drag started");\n});\n\ndropzone.addEventListener("dragover", function(event) {\n  event.preventDefault(); // Allow drop\n});\n\ndropzone.addEventListener("drop", function(event) {\n  event.preventDefault();\n  var data = event.dataTransfer.getData("text/plain");\n  var draggedElement = document.getElementById(data);\n  dropzone.appendChild(draggedElement);\n  console.log("Element dropped");\n});\n\n// Throttling Events (for performance)\nfunction throttle(func, delay) {\n  let timeoutId;\n  let lastExecTime = 0;\n  return function (...args) {\n    const currentTime = Date.now();\n    \n    if (currentTime - lastExecTime > delay) {\n      func.apply(this, args);\n      lastExecTime = currentTime;\n    } else {\n      clearTimeout(timeoutId);\n      timeoutId = setTimeout(() => {\n        func.apply(this, args);\n        lastExecTime = Date.now();\n      }, delay - (currentTime - lastExecTime));\n    }\n  };\n}\n\n// Throttled scroll event\nwindow.addEventListener("scroll", throttle(function() {\n  console.log("Throttled scroll event");\n}, 100));\n\n// Debouncing Events\nfunction debounce(func, delay) {\n  let timeoutId;\n  return function (...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n}\n\n// Debounced input event\nvar searchInput = document.getElementById("searchInput");\nsearchInput.addEventListener("input", debounce(function() {\n  console.log("Search query: " + this.value);\n  // Perform search operation\n}, 300));'
               ]
             },
             {
               id: 'js-arrays',
               title: 'JavaScript Arrays',
               content: `Arrays are used to store multiple values in a single variable. JavaScript arrays are resizable and can contain a mix of different data types.

What is an Array?
An array is a special variable that can hold more than one value at a time. Arrays are ordered collections of items (elements).

Creating Arrays:
• Array literal: var arr = [1, 2, 3]
• Array constructor: var arr = new Array(1, 2, 3)
• Empty array: var arr = []

Array Elements:
Array elements are accessed using index numbers, starting from 0.

Array Properties:
• length - returns the number of elements in an array

Array Methods:
• push() - adds elements to the end
• pop() - removes the last element
• shift() - removes the first element
• unshift() - adds elements to the beginning
• splice() - adds/removes elements at any position
• slice() - returns a portion of an array
• concat() - joins arrays together
• join() - converts array to string
• reverse() - reverses the array order
• sort() - sorts the array elements

Array Iteration:
• for loop - traditional loop
• for...of loop - iterates over values
• forEach() - executes function for each element
• map() - creates new array with transformed elements
• filter() - creates new array with filtered elements
• reduce() - reduces array to single value

Multidimensional Arrays:
Arrays can contain other arrays, creating multidimensional structures.`,
               syntax: '// Creating arrays\nvar fruits = ["apple", "banana", "orange"];\nvar numbers = [1, 2, 3, 4, 5];\nvar mixed = [1, "hello", true, null];\n\n// Accessing elements\nconsole.log(fruits[0]); // "apple"\nconsole.log(numbers[2]); // 3\n\n// Array length\nconsole.log(fruits.length); // 3',
               examples: [
                 '// Creating Arrays\n// Array literal (most common)\nvar fruits = ["apple", "banana", "orange", "grape"];\nvar numbers = [1, 2, 3, 4, 5];\nvar mixed = [1, "hello", true, null, undefined];\nvar empty = [];\n\n// Array constructor\nvar colors = new Array("red", "green", "blue");\nvar sizes = new Array(10); // Creates array with 10 empty slots\nvar moreNumbers = new Array(1, 2, 3, 4);\n\n// Accessing Array Elements\nconsole.log(fruits[0]); // "apple" (first element)\nconsole.log(fruits[1]); // "banana" (second element)\nconsole.log(fruits[3]); // "grape" (fourth element)\nconsole.log(fruits[10]); // undefined (doesn\'t exist)\n\n// Modifying Array Elements\nfruits[1] = "mango"; // Change "banana" to "mango"\nfruits[4] = "kiwi"; // Add new element\nconsole.log(fruits); // ["apple", "mango", "orange", "grape", "kiwi"]\n\n// Array Length Property\nconsole.log(fruits.length); // 5\nconsole.log(empty.length); // 0\n\n// Changing array length\nfruits.length = 3; // Truncates array\nconsole.log(fruits); // ["apple", "mango", "orange"]\n\nfruits.length = 5; // Extends array with undefined elements\nconsole.log(fruits); // ["apple", "mango", "orange", undefined, undefined]\n\n// Adding Elements\n// push() - adds to end\nfruits.push("strawberry");\nfruits.push("blueberry", "raspberry"); // Multiple elements\nconsole.log(fruits); // [..., "strawberry", "blueberry", "raspberry"]\n\n// unshift() - adds to beginning\nfruits.unshift("pineapple");\nfruits.unshift("coconut", "papaya"); // Multiple elements\nconsole.log(fruits); // ["coconut", "papaya", "pineapple", ...]\n\n// Direct assignment\nfruits[fruits.length] = "watermelon"; // Adds to end\n\n// Removing Elements\n// pop() - removes from end\nvar lastFruit = fruits.pop();\nconsole.log(lastFruit); // "watermelon"\nconsole.log(fruits); // Array without last element\n\n// shift() - removes from beginning\nvar firstFruit = fruits.shift();\nconsole.log(firstFruit); // "coconut"\nconsole.log(fruits); // Array without first element\n\n// delete operator (creates undefined hole)\ndelete fruits[1];\nconsole.log(fruits); // [..., undefined, ...]\nconsole.log(fruits.length); // Length unchanged\n\n// splice() - removes/adds elements at any position\nvar animals = ["cat", "dog", "bird", "fish", "rabbit"];\n\n// Remove elements\nvar removed = animals.splice(1, 2); // Remove 2 elements starting at index 1\nconsole.log(removed); // ["dog", "bird"]\nconsole.log(animals); // ["cat", "fish", "rabbit"]\n\n// Add elements\nanimals.splice(1, 0, "hamster", "turtle"); // Add at index 1, remove 0\nconsole.log(animals); // ["cat", "hamster", "turtle", "fish", "rabbit"]\n\n// Replace elements\nanimals.splice(2, 1, "snake"); // Replace 1 element at index 2\nconsole.log(animals); // ["cat", "hamster", "snake", "fish", "rabbit"]\n\n// Array Methods\nvar numbers = [1, 2, 3, 4, 5];\n\n// slice() - returns portion of array (doesn\'t modify original)\nvar portion = numbers.slice(1, 4); // From index 1 to 3 (4 not included)\nconsole.log(portion); // [2, 3, 4]\nconsole.log(numbers); // [1, 2, 3, 4, 5] (unchanged)\n\nvar lastTwo = numbers.slice(-2); // Last 2 elements\nconsole.log(lastTwo); // [4, 5]\n\n// concat() - joins arrays\nvar arr1 = [1, 2, 3];\nvar arr2 = [4, 5, 6];\nvar arr3 = [7, 8, 9];\n\nvar combined = arr1.concat(arr2);\nconsole.log(combined); // [1, 2, 3, 4, 5, 6]\n\nvar allCombined = arr1.concat(arr2, arr3);\nconsole.log(allCombined); // [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n// join() - converts array to string\nvar words = ["Hello", "World", "JavaScript"];\nvar sentence = words.join(" "); // Join with space\nconsole.log(sentence); // "Hello World JavaScript"\n\nvar csv = numbers.join(","); // Join with comma\nconsole.log(csv); // "1,2,3,4,5"\n\nvar dashed = words.join("-");\nconsole.log(dashed); // "Hello-World-JavaScript"\n\n// reverse() - reverses array order (modifies original)\nvar letters = ["a", "b", "c", "d"];\nletters.reverse();\nconsole.log(letters); // ["d", "c", "b", "a"]\n\n// sort() - sorts array elements (modifies original)\nvar unsorted = ["banana", "apple", "cherry", "date"];\nunsorted.sort();\nconsole.log(unsorted); // ["apple", "banana", "cherry", "date"]\n\n// Sorting numbers (requires compare function)\nvar nums = [10, 5, 40, 25, 1000, 1];\nnums.sort(); // Sorts as strings!\nconsole.log(nums); // [1, 10, 1000, 25, 40, 5] (wrong!)\n\n// Correct number sorting\nnums.sort(function(a, b) {\n  return a - b; // Ascending order\n});\nconsole.log(nums); // [1, 5, 10, 25, 40, 1000]\n\n// Descending order\nnums.sort(function(a, b) {\n  return b - a;\n});\nconsole.log(nums); // [1000, 40, 25, 10, 5, 1]\n\n// Array Iteration\nvar colors = ["red", "green", "blue", "yellow"];\n\n// Traditional for loop\nfor (var i = 0; i < colors.length; i++) {\n  console.log(i + ": " + colors[i]);\n}\n\n// for...of loop (ES6)\nfor (var color of colors) {\n  console.log(color);\n}\n\n// for...in loop (gets indices)\nfor (var index in colors) {\n  console.log(index + ": " + colors[index]);\n}\n\n// forEach() method\ncolors.forEach(function(color, index) {\n  console.log(index + ": " + color);\n});\n\n// Arrow function with forEach\ncolors.forEach((color, index) => {\n  console.log(`${index}: ${color}`);\n});\n\n// map() - creates new array with transformed elements\nvar numbers = [1, 2, 3, 4, 5];\nvar doubled = numbers.map(function(num) {\n  return num * 2;\n});\nconsole.log(doubled); // [2, 4, 6, 8, 10]\nconsole.log(numbers); // [1, 2, 3, 4, 5] (unchanged)\n\n// map() with arrow function\nvar squared = numbers.map(num => num * num);\nconsole.log(squared); // [1, 4, 9, 16, 25]\n\n// filter() - creates new array with filtered elements\nvar ages = [12, 18, 25, 30, 16, 21];\nvar adults = ages.filter(function(age) {\n  return age >= 18;\n});\nconsole.log(adults); // [18, 25, 30, 21]\n\n// filter() with arrow function\nvar evenNumbers = numbers.filter(num => num % 2 === 0);\nconsole.log(evenNumbers); // [2, 4]\n\n// reduce() - reduces array to single value\nvar sum = numbers.reduce(function(total, num) {\n  return total + num;\n}, 0); // 0 is initial value\nconsole.log(sum); // 15\n\n// reduce() with arrow function\nvar product = numbers.reduce((total, num) => total * num, 1);\nconsole.log(product); // 120\n\n// Find maximum value with reduce\nvar max = numbers.reduce((max, num) => num > max ? num : max);\nconsole.log(max); // 5\n\n// find() - returns first element that matches condition\nvar people = [\n  {name: "John", age: 25},\n  {name: "Jane", age: 30},\n  {name: "Bob", age: 35}\n];\n\nvar person = people.find(function(p) {\n  return p.age > 28;\n});\nconsole.log(person); // {name: "Jane", age: 30}\n\n// findIndex() - returns index of first matching element\nvar index = people.findIndex(p => p.name === "Bob");\nconsole.log(index); // 2\n\n// some() - tests if at least one element passes test\nvar hasAdult = ages.some(age => age >= 18);\nconsole.log(hasAdult); // true\n\n// every() - tests if all elements pass test\nvar allAdults = ages.every(age => age >= 18);\nconsole.log(allAdults); // false\n\n// includes() - checks if array contains element\nconsole.log(colors.includes("red")); // true\nconsole.log(colors.includes("purple")); // false\n\n// indexOf() - returns first index of element\nconsole.log(colors.indexOf("blue")); // 2\nconsole.log(colors.indexOf("purple")); // -1 (not found)\n\n// lastIndexOf() - returns last index of element\nvar repeated = ["a", "b", "c", "b", "d"];\nconsole.log(repeated.lastIndexOf("b")); // 3\n\n// Multidimensional Arrays\nvar matrix = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n];\n\nconsole.log(matrix[1][2]); // 6 (row 1, column 2)\n\n// Iterating through 2D array\nfor (var i = 0; i < matrix.length; i++) {\n  for (var j = 0; j < matrix[i].length; j++) {\n    console.log(`matrix[${i}][${j}] = ${matrix[i][j]}`);\n  }\n}\n\n// Array of objects\nvar students = [\n  {name: "Alice", grade: 85, subject: "Math"},\n  {name: "Bob", grade: 92, subject: "Science"},\n  {name: "Charlie", grade: 78, subject: "English"}\n];\n\n// Filter students with grade > 80\nvar topStudents = students.filter(student => student.grade > 80);\nconsole.log(topStudents);\n\n// Get all student names\nvar names = students.map(student => student.name);\nconsole.log(names); // ["Alice", "Bob", "Charlie"]\n\n// Calculate average grade\nvar averageGrade = students.reduce((sum, student) => sum + student.grade, 0) / students.length;\nconsole.log(averageGrade); // 85\n\n// Array Destructuring (ES6)\nvar fruits = ["apple", "banana", "orange"];\nvar [first, second, third] = fruits;\nconsole.log(first); // "apple"\nconsole.log(second); // "banana"\nconsole.log(third); // "orange"\n\n// Skip elements\nvar [firstFruit, , thirdFruit] = fruits;\nconsole.log(firstFruit); // "apple"\nconsole.log(thirdFruit); // "orange"\n\n// Rest operator\nvar [head, ...tail] = fruits;\nconsole.log(head); // "apple"\nconsole.log(tail); // ["banana", "orange"]\n\n// Spread Operator (ES6)\nvar arr1 = [1, 2, 3];\nvar arr2 = [4, 5, 6];\nvar combined = [...arr1, ...arr2];\nconsole.log(combined); // [1, 2, 3, 4, 5, 6]\n\n// Copy array\nvar original = [1, 2, 3];\nvar copy = [...original];\nconsole.log(copy); // [1, 2, 3]\n\n// Array.from() - creates array from array-like object\nvar str = "hello";\nvar charArray = Array.from(str);\nconsole.log(charArray); // ["h", "e", "l", "l", "o"]\n\n// Array.isArray() - checks if value is array\nconsole.log(Array.isArray(fruits)); // true\nconsole.log(Array.isArray("hello")); // false\nconsole.log(Array.isArray({})); // false'
               ]
             },
             {
               id: 'js-objects',
               title: 'JavaScript Objects',
               content: `Objects are collections of key-value pairs. They are one of the most important data types in JavaScript and are used to store and organize related data and functionality.

What is an Object?
An object is a collection of properties, where each property is defined as a key-value pair. Objects can contain primitive values, other objects, and functions (called methods when they're part of an object).

Creating Objects:
• Object literal: var obj = {key: value}
• Object constructor: var obj = new Object()
• Constructor function: function Person() {}
• Object.create(): var obj = Object.create(prototype)

Object Properties:
Properties are the values associated with a JavaScript object. They can be accessed using dot notation or bracket notation.

Object Methods:
Methods are functions stored as object properties. They can access other properties of the same object using the 'this' keyword.

Property Access:
• Dot notation: object.property
• Bracket notation: object["property"]
• Computed property names: object[variable]

Adding and Deleting Properties:
Properties can be added or deleted dynamically after object creation.

Object Iteration:
• for...in loop - iterates over enumerable properties
• Object.keys() - returns array of property names
• Object.values() - returns array of property values
• Object.entries() - returns array of [key, value] pairs

Object Methods:
• Object.assign() - copies properties from source to target
• Object.freeze() - prevents modification of object
• Object.seal() - prevents adding/deleting properties
• hasOwnProperty() - checks if property exists

Nested Objects:
Objects can contain other objects, creating complex data structures.

Object Destructuring:
ES6 feature that allows extracting properties from objects into variables.`,
               syntax: '// Object literal\nvar person = {\n  name: "John",\n  age: 30,\n  city: "New York"\n};\n\n// Accessing properties\nconsole.log(person.name); // "John"\nconsole.log(person["age"]); // 30\n\n// Adding methods\nperson.greet = function() {\n  return "Hello, " + this.name;\n};',
               examples: [
                 '// Creating Objects\n// Object literal (most common)\nvar person = {\n  firstName: "John",\n  lastName: "Doe",\n  age: 30,\n  city: "New York",\n  isEmployed: true\n};\n\n// Empty object\nvar emptyObj = {};\n\n// Object constructor\nvar car = new Object();\ncar.make = "Toyota";\ncar.model = "Camry";\ncar.year = 2022;\n\n// Object with methods\nvar calculator = {\n  x: 0,\n  y: 0,\n  setValues: function(a, b) {\n    this.x = a;\n    this.y = b;\n  },\n  add: function() {\n    return this.x + this.y;\n  },\n  multiply: function() {\n    return this.x * this.y;\n  }\n};\n\n// Accessing Object Properties\n// Dot notation\nconsole.log(person.firstName); // "John"\nconsole.log(person.age); // 30\n\n// Bracket notation\nconsole.log(person["lastName"]); // "Doe"\nconsole.log(person["city"]); // "New York"\n\n// Dynamic property access\nvar propertyName = "age";\nconsole.log(person[propertyName]); // 30\n\n// Accessing non-existent property\nconsole.log(person.salary); // undefined\n\n// Modifying Object Properties\nperson.age = 31; // Change existing property\nperson.country = "USA"; // Add new property\nperson["email"] = "john@example.com"; // Add with bracket notation\n\nconsole.log(person);\n// {\n//   firstName: "John",\n//   lastName: "Doe", \n//   age: 31,\n//   city: "New York",\n//   isEmployed: true,\n//   country: "USA",\n//   email: "john@example.com"\n// }\n\n// Deleting Properties\ndelete person.isEmployed;\nconsole.log(person.isEmployed); // undefined\n\n// Object Methods\nvar student = {\n  name: "Alice",\n  grades: [85, 92, 78, 96],\n  \n  // Method to calculate average\n  getAverage: function() {\n    var sum = this.grades.reduce(function(total, grade) {\n      return total + grade;\n    }, 0);\n    return sum / this.grades.length;\n  },\n  \n  // Method to add grade\n  addGrade: function(grade) {\n    this.grades.push(grade);\n  },\n  \n  // Method to get full info\n  getInfo: function() {\n    return this.name + " has an average of " + this.getAverage().toFixed(2);\n  }\n};\n\nconsole.log(student.getAverage()); // 87.75\nstudent.addGrade(88);\nconsole.log(student.getInfo()); // "Alice has an average of 87.80"\n\n// Constructor Functions\nfunction Person(firstName, lastName, age) {\n  this.firstName = firstName;\n  this.lastName = lastName;\n  this.age = age;\n  \n  this.getFullName = function() {\n    return this.firstName + " " + this.lastName;\n  };\n  \n  this.greet = function() {\n    return "Hello, I\'m " + this.getFullName();\n  };\n}\n\n// Creating objects with constructor\nvar person1 = new Person("John", "Smith", 25);\nvar person2 = new Person("Jane", "Johnson", 30);\n\nconsole.log(person1.getFullName()); // "John Smith"\nconsole.log(person2.greet()); // "Hello, I\'m Jane Johnson"\n\n// Object.create()\nvar personPrototype = {\n  greet: function() {\n    return "Hello, I\'m " + this.name;\n  },\n  setName: function(name) {\n    this.name = name;\n  }\n};\n\nvar person3 = Object.create(personPrototype);\nperson3.setName("Bob");\nconsole.log(person3.greet()); // "Hello, I\'m Bob"\n\n// Object Iteration\nvar book = {\n  title: "JavaScript Guide",\n  author: "John Author",\n  pages: 300,\n  published: 2023,\n  genre: "Programming"\n};\n\n// for...in loop\nconsole.log("Using for...in:");\nfor (var property in book) {\n  console.log(property + ": " + book[property]);\n}\n\n// Object.keys()\nvar keys = Object.keys(book);\nconsole.log("Keys:", keys);\n// ["title", "author", "pages", "published", "genre"]\n\n// Object.values()\nvar values = Object.values(book);\nconsole.log("Values:", values);\n// ["JavaScript Guide", "John Author", 300, 2023, "Programming"]\n\n// Object.entries()\nvar entries = Object.entries(book);\nconsole.log("Entries:", entries);\n// [["title", "JavaScript Guide"], ["author", "John Author"], ...]\n\n// Iterating with forEach\nObject.keys(book).forEach(function(key) {\n  console.log(key + ": " + book[key]);\n});\n\n// Object Methods and Properties\nvar product = {\n  name: "Laptop",\n  price: 999.99,\n  category: "Electronics"\n};\n\n// hasOwnProperty()\nconsole.log(product.hasOwnProperty("name")); // true\nconsole.log(product.hasOwnProperty("color")); // false\n\n// Object.assign() - copy properties\nvar defaults = {\n  color: "black",\n  warranty: "1 year",\n  inStock: true\n};\n\nvar laptop = Object.assign({}, defaults, product);\nconsole.log(laptop);\n// {\n//   color: "black",\n//   warranty: "1 year", \n//   inStock: true,\n//   name: "Laptop",\n//   price: 999.99,\n//   category: "Electronics"\n// }\n\n// Object.freeze() - prevent modifications\nvar frozenObj = Object.freeze({\n  name: "Immutable",\n  value: 42\n});\n\nfrozenObj.name = "Changed"; // Silently fails\nfrozenObj.newProp = "New"; // Silently fails\nconsole.log(frozenObj); // {name: "Immutable", value: 42}\n\n// Object.seal() - prevent adding/deleting properties\nvar sealedObj = Object.seal({\n  name: "Sealed",\n  value: 100\n});\n\nsealedObj.name = "Modified"; // This works\nsealedObj.newProp = "New"; // Silently fails\ndelete sealedObj.value; // Silently fails\nconsole.log(sealedObj); // {name: "Modified", value: 100}\n\n// Nested Objects\nvar company = {\n  name: "Tech Corp",\n  founded: 2010,\n  address: {\n    street: "123 Main St",\n    city: "San Francisco",\n    state: "CA",\n    zipCode: "94105"\n  },\n  employees: [\n    {\n      name: "Alice Johnson",\n      position: "Developer",\n      salary: 75000,\n      skills: ["JavaScript", "React", "Node.js"]\n    },\n    {\n      name: "Bob Smith", \n      position: "Designer",\n      salary: 65000,\n      skills: ["Photoshop", "Illustrator", "Figma"]\n    }\n  ],\n  getEmployeeCount: function() {\n    return this.employees.length;\n  },\n  getAverageSalary: function() {\n    var total = this.employees.reduce(function(sum, emp) {\n      return sum + emp.salary;\n    }, 0);\n    return total / this.employees.length;\n  }\n};\n\n// Accessing nested properties\nconsole.log(company.address.city); // "San Francisco"\nconsole.log(company.employees[0].name); // "Alice Johnson"\nconsole.log(company.employees[1].skills[2]); // "Figma"\n\n// Using nested methods\nconsole.log(company.getEmployeeCount()); // 2\nconsole.log(company.getAverageSalary()); // 70000\n\n// Object Destructuring (ES6)\nvar user = {\n  username: "johndoe",\n  email: "john@example.com",\n  age: 28,\n  preferences: {\n    theme: "dark",\n    language: "en"\n  }\n};\n\n// Basic destructuring\nvar {username, email, age} = user;\nconsole.log(username); // "johndoe"\nconsole.log(email); // "john@example.com"\nconsole.log(age); // 28\n\n// Renaming variables\nvar {username: name, email: userEmail} = user;\nconsole.log(name); // "johndoe"\nconsole.log(userEmail); // "john@example.com"\n\n// Default values\nvar {username, country = "USA"} = user;\nconsole.log(country); // "USA" (default value)\n\n// Nested destructuring\nvar {preferences: {theme, language}} = user;\nconsole.log(theme); // "dark"\nconsole.log(language); // "en"\n\n// Rest operator in destructuring\nvar {username, ...otherProps} = user;\nconsole.log(username); // "johndoe"\nconsole.log(otherProps); // {email: "john@example.com", age: 28, preferences: {...}}\n\n// Computed Property Names (ES6)\nvar propertyName = "dynamicKey";\nvar dynamicObj = {\n  [propertyName]: "dynamic value",\n  ["computed" + "Key"]: "another value"\n};\n\nconsole.log(dynamicObj.dynamicKey); // "dynamic value"\nconsole.log(dynamicObj.computedKey); // "another value"\n\n// Method Shorthand (ES6)\nvar modernObj = {\n  name: "Modern Object",\n  \n  // Old way\n  oldMethod: function() {\n    return "Old method";\n  },\n  \n  // New way (method shorthand)\n  newMethod() {\n    return "New method";\n  },\n  \n  // Arrow function (be careful with \'this\')\n  arrowMethod: () => {\n    return "Arrow method";\n  }\n};\n\n// Property Shorthand (ES6)\nvar name = "JavaScript";\nvar version = "ES6";\n\n// Old way\nvar language1 = {\n  name: name,\n  version: version\n};\n\n// New way (property shorthand)\nvar language2 = {\n  name,\n  version\n};\n\nconsole.log(language2); // {name: "JavaScript", version: "ES6"}\n\n// Object Comparison\nvar obj1 = {name: "John"};\nvar obj2 = {name: "John"};\nvar obj3 = obj1;\n\nconsole.log(obj1 === obj2); // false (different objects)\nconsole.log(obj1 === obj3); // true (same reference)\n\n// Deep comparison function\nfunction deepEqual(obj1, obj2) {\n  var keys1 = Object.keys(obj1);\n  var keys2 = Object.keys(obj2);\n  \n  if (keys1.length !== keys2.length) {\n    return false;\n  }\n  \n  for (var key of keys1) {\n    if (obj1[key] !== obj2[key]) {\n      return false;\n    }\n  }\n  \n  return true;\n}\n\nconsole.log(deepEqual(obj1, obj2)); // true\n\n// JSON Methods\nvar dataObj = {\n  name: "Data Object",\n  numbers: [1, 2, 3],\n  nested: {\n    prop: "value"\n  }\n};\n\n// Convert to JSON string\nvar jsonString = JSON.stringify(dataObj);\nconsole.log(jsonString);\n// \'{"name":"Data Object","numbers":[1,2,3],"nested":{"prop":"value"}}\'\n\n// Parse JSON string back to object\nvar parsedObj = JSON.parse(jsonString);\nconsole.log(parsedObj); // Same structure as dataObj\n\n// Object as Map (key-value store)\nvar userRoles = {\n  "user123": "admin",\n  "user456": "editor", \n  "user789": "viewer"\n};\n\n// Check if user exists\nfunction hasUser(userId) {\n  return userId in userRoles;\n}\n\n// Get user role\nfunction getUserRole(userId) {\n  return userRoles[userId] || "guest";\n}\n\nconsole.log(hasUser("user123")); // true\nconsole.log(getUserRole("user999")); // "guest"\n\n// Object with Symbol keys (ES6)\nvar sym1 = Symbol("description");\nvar sym2 = Symbol("another");\n\nvar objWithSymbols = {\n  [sym1]: "symbol value 1",\n  [sym2]: "symbol value 2",\n  regularProp: "regular value"\n};\n\nconsole.log(objWithSymbols[sym1]); // "symbol value 1"\nconsole.log(Object.keys(objWithSymbols)); // ["regularProp"] (symbols not included)'
               ]
             }
           ],
           questions: [
             {
               id: 1,
               question: "What is the correct way to declare a function in JavaScript?",
               options: [
                 "function = myFunction() {}",
                 "function myFunction() {}",
                 "declare function myFunction() {}",
                 "def myFunction() {}"
               ],
               correct: 1
             },
             {
               id: 2,
               question: "Which event occurs when the user clicks on an HTML element?",
               options: [
                 "onchange",
                 "onclick",
                 "onmouseclick",
                 "onselect"
               ],
               correct: 1
             },
             {
               id: 3,
               question: "How do you add an element to the end of an array?",
               options: [
                 "array.add(element)",
                 "array.push(element)",
                 "array.append(element)",
                 "array.insert(element)"
               ],
               correct: 1
             },
             {
               id: 4,
               question: "What is the correct way to access the first element of an array called 'fruits'?",
               options: [
                 "fruits[1]",
                 "fruits[0]",
                 "fruits.first()",
                 "fruits.get(0)"
               ],
               correct: 1
             },
             {
               id: 5,
               question: "How do you create an object in JavaScript?",
               options: [
                 "var obj = (name: 'John', age: 30)",
                 "var obj = {name: 'John', age: 30}",
                 "var obj = [name: 'John', age: 30]",
                 "var obj = <name: 'John', age: 30>"
               ],
               correct: 1
             },
             {
               id: 6,
               question: "Which method removes the last element from an array?",
               options: [
                 "removeLast()",
                 "pop()",
                 "delete()",
                 "shift()"
               ],
               correct: 1
             },
             {
               id: 7,
               question: "How do you access a property called 'name' in an object called 'person'?",
               options: [
                 "person->name",
                 "person.name",
                 "person[name]",
                 "person::name"
               ],
               correct: 1
             },
             {
               id: 8,
               question: "What does the 'this' keyword refer to in a JavaScript object method?",
               options: [
                 "The global object",
                 "The current object",
                 "The parent object",
                 "Nothing"
               ],
               correct: 1
             },
             {
               id: 9,
               question: "Which method is used to prevent the default action of an event?",
               options: [
                 "event.stop()",
                 "event.preventDefault()",
                 "event.cancel()",
                 "event.halt()"
               ],
               correct: 1
             },
             {
               id: 10,
               question: "How do you iterate through all properties of an object?",
               options: [
                 "for (var i in object)",
                 "for (var prop in object)",
                 "for (var key of object)",
                 "forEach(object)"
               ],
               correct: 1
             }
           ]
         }
     };

     return assignments[id] || null;
   };

   const assignmentData = getAssignmentData(assignmentId || '');

   useEffect(() => {
     if (!assignmentData) {
       navigate('/student-portal');
     } else {
       // Set first topic as selected by default only if no topic is currently selected
       if (assignmentData.topics.length > 0 && !selectedTopic) {
         setSelectedTopic(assignmentData.topics[0].id);
       }
     }
   }, [assignmentData, navigate, selectedTopic]);

   const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
     setSelectedAnswers(prev => ({
       ...prev,
       [questionIndex]: answerIndex
     }));
   };

   const handleNextQuestion = () => {
     if (currentQuestionIndex < assignmentData!.questions.length - 1) {
       setCurrentQuestionIndex(prev => prev + 1);
     }
   };

   const handlePreviousQuestion = () => {
     if (currentQuestionIndex > 0) {
       setCurrentQuestionIndex(prev => prev - 1);
     }
   };

   const handleSubmitTest = () => {
     const correctAnswers = assignmentData!.questions.filter((question, index) => 
       selectedAnswers[index] === question.correctAnswer
     ).length;
     
     setScore(correctAnswers);
     setShowResults(true);
     
     if (correctAnswers >= Math.ceil(assignmentData!.questions.length * 0.7)) {
       setTestCompleted(true);
     }
   };

   const handleRetakeTest = () => {
     setSelectedAnswers({});
     setCurrentQuestionIndex(0);
     setShowResults(false);
     setScore(0);
   };

   const toggleSection = (sectionId: string) => {
     setExpandedSections(prev => ({
       ...prev,
       [sectionId]: !prev[sectionId]
     }));
   };

   const selectedTopicData = assignmentData?.topics.find(topic => topic.id === selectedTopic);

   if (!assignmentData) {
     return (
       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
         <div className="text-white text-xl">Loading...</div>
       </div>
     );
   }

   return (
     <div className="min-h-screen bg-gray-900 text-white">
       {/* Header */}
       <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
         <div className="flex items-center justify-between">
           <button
             onClick={() => navigate('/student-portal')}
             className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
           >
             <ArrowLeftIcon className="h-5 w-5" />
             <span>Back to Portal</span>
           </button>
           <h1 className="text-2xl font-bold text-center">{assignmentData.title}</h1>
           <div className="w-32"></div>
         </div>
       </div>

       {/* Navigation Tabs */}
       <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
         <div className="flex space-x-1">
           <button
             onClick={() => setCurrentView('study')}
             className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
               currentView === 'study' 
                 ? 'bg-blue-600 text-white' 
                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
             }`}
           >
             <BookOpenIcon className="h-4 w-4" />
             <span>Study Material</span>
           </button>
           <button
             onClick={() => setCurrentView('test')}
             className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
               currentView === 'test' 
                 ? 'bg-blue-600 text-white' 
                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
             }`}
           >
             <ClipboardDocumentCheckIcon className="h-4 w-4" />
             <span>MCQ Test</span>
           </button>
         </div>
       </div>

       <div className="flex h-[calc(100vh-120px)]">
         {/* Content */}
         {currentView === 'study' ? (
           <>
             {/* Enhanced Sidebar Navigation */}
             <div className="w-80 bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-600 overflow-y-auto shadow-2xl">
               <div className="p-6">
                 <div className="mb-6">
                   <h2 className="text-xl font-bold mb-2 text-white flex items-center">
                     <BookOpenIcon className="h-6 w-6 mr-3 text-blue-400" />
                     Course Topics
                   </h2>
                   <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                 </div>
                 
                 <nav className="space-y-2">
                   {assignmentData.topics.map((topic, index) => (
                     <motion.button
                       key={topic.id}
                       onClick={() => setSelectedTopic(topic.id)}
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm group ${
                         selectedTopic === topic.id
                           ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                           : 'text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50 hover:border-gray-600'
                       }`}
                     >
                       <div className="flex items-center space-x-3">
                         <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${
                           selectedTopic === topic.id
                             ? 'bg-white/20 text-white'
                             : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-white'
                         }`}>
                           {index + 1}
                         </div>
                         <div className="flex-1 min-w-0">
                           <span className="block truncate font-medium">{topic.title}</span>
                           <span className={`text-xs ${
                             selectedTopic === topic.id ? 'text-blue-100' : 'text-gray-500 group-hover:text-gray-400'
                           }`}>
                             Click to study
                           </span>
                         </div>
                         <ChevronRightIcon className={`h-4 w-4 transition-transform ${
                           selectedTopic === topic.id ? 'rotate-90 text-white' : 'text-gray-500 group-hover:text-gray-300'
                         }`} />
                       </div>
                     </motion.button>
                   ))}
                 </nav>

                 <div className="mt-8 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-xl">
                   <div className="flex items-center mb-2">
                     <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                     <span className="text-sm font-medium text-green-400">Study Progress</span>
                   </div>
                   <div className="text-xs text-gray-400">
                     Complete all topics before taking the test
                   </div>
                 </div>
               </div>
             </div>

             {/* Enhanced Main Content Area */}
             <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
               <div className="p-8 max-w-5xl mx-auto">
                 {selectedTopicData ? (
                   <motion.div
                     key={selectedTopic}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     className="space-y-8"
                   >
                     {/* Enhanced Topic Header */}
                     <div className="border-b border-gray-700 pb-6">
                       <motion.h1 
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.1 }}
                         className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                       >
                         {selectedTopicData.title}
                       </motion.h1>
                       <div className="flex items-center space-x-4 text-sm text-gray-400">
                         <span className="flex items-center">
                           <DocumentTextIcon className="h-4 w-4 mr-1" />
                           Study Material
                         </span>
                         <span>•</span>
                         <span>Interactive Learning</span>
                       </div>
                     </div>
                     
                     {/* Enhanced Content Section */}
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.2 }}
                       className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl"
                     >
                       <div className="prose prose-invert prose-lg max-w-none">
                         <div className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
                           {selectedTopicData.content}
                         </div>
                       </div>
                     </motion.div>

                     {/* Enhanced Syntax Section */}
                     {selectedTopicData.syntax && (
                       <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                         className="space-y-4"
                       >
                         <h3 className="text-2xl font-bold text-white flex items-center">
                           <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                             <CodeBracketIcon className="h-5 w-5 text-white" />
                           </div>
                           Syntax Reference
                         </h3>
                         <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-600 shadow-2xl">
                           <div className="flex items-center justify-between mb-4">
                             <span className="text-sm text-gray-400 font-medium">Code Syntax</span>
                             <div className="flex space-x-2">
                               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                               <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                             </div>
                           </div>
                           <pre className="text-green-400 text-sm overflow-x-auto font-mono leading-relaxed">
                             <code>{selectedTopicData.syntax}</code>
                           </pre>
                         </div>
                       </motion.div>
                     )}

                     {/* Enhanced Examples Section */}
                     {selectedTopicData.examples && selectedTopicData.examples.length > 0 && (
                       <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4 }}
                         className="space-y-6"
                       >
                         <h3 className="text-2xl font-bold text-white flex items-center">
                           <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                             <PlayIcon className="h-5 w-5 text-white" />
                           </div>
                           Practical Examples
                         </h3>
                         <div className="grid gap-6">
                           {selectedTopicData.examples.map((example, index) => (
                             <motion.div 
                               key={index}
                               initial={{ opacity: 0, x: -20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.1 * index }}
                               className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-600 shadow-2xl"
                             >
                               <div className="flex items-center justify-between mb-4">
                                 <span className="text-sm text-gray-400 font-medium">Example {index + 1}</span>
                                 <div className="flex space-x-2">
                                   <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                   <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                 </div>
                               </div>
                               <pre className="text-blue-400 text-sm overflow-x-auto font-mono leading-relaxed">
                                 <code>{example}</code>
                               </pre>
                             </motion.div>
                           ))}
                         </div>
                       </motion.div>
                     )}

                     {/* Enhanced Tip Section */}
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.5 }}
                       className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-600/50 rounded-2xl p-6 backdrop-blur-sm"
                     >
                       <div className="flex items-start space-x-4">
                         <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                           <span className="text-white text-lg">💡</span>
                         </div>
                         <div>
                           <h4 className="text-lg font-semibold text-white mb-2">Study Tip</h4>
                           <p className="text-blue-200 leading-relaxed">
                             After studying all topics thoroughly, take the MCQ test to complete the assignment. 
                             You need to score at least <span className="font-bold text-white">70%</span> to pass. 
                             Take your time to understand each concept before proceeding.
                           </p>
                         </div>
                       </div>
                     </motion.div>
                   </motion.div>
                 ) : (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="flex flex-col items-center justify-center h-full text-center"
                   >
                     <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                       <BookOpenIcon className="h-12 w-12 text-white" />
                     </div>
                     <h2 className="text-2xl font-bold text-white mb-4">Welcome to {assignmentData.title}</h2>
                     <p className="text-gray-400 max-w-md">
                       Select a topic from the sidebar to begin your learning journey. Each topic contains comprehensive 
                       explanations, syntax references, and practical examples.
                     </p>
                   </motion.div>
                 )}
               </div>
             </div>
           </>
         ) : (
           <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
             {/* Enhanced Test Section */}
             <div className="p-8 max-w-5xl mx-auto">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.4, ease: "easeOut" }}
                 className="space-y-8"
               >
                 {!showResults ? (
                   <>
                     {/* Enhanced Test Header */}
                     <div className="border-b border-gray-700 pb-6">
                       <motion.h1 
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.1 }}
                         className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                       >
                         MCQ Assessment
                       </motion.h1>
                       <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-4 text-sm text-gray-400">
                           <span className="flex items-center">
                             <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />
                             Multiple Choice Questions
                           </span>
                           <span>•</span>
                           <span>70% Required to Pass</span>
                         </div>
                         <div className="text-right">
                           <div className="text-sm text-gray-400 mb-2">
                             Question {currentQuestionIndex + 1} of {assignmentData.questions.length}
                           </div>
                           <div className="w-48 bg-gray-700 rounded-full h-3 overflow-hidden">
                             <motion.div 
                               className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                               initial={{ width: 0 }}
                               animate={{ width: `${((currentQuestionIndex + 1) / assignmentData.questions.length) * 100}%` }}
                               transition={{ duration: 0.5, ease: "easeOut" }}
                             />
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Enhanced Question Card */}
                     <motion.div 
                       key={currentQuestionIndex}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.3 }}
                       className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl"
                     >
                       <div className="mb-8">
                         <div className="flex items-center mb-4">
                           <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                             {currentQuestionIndex + 1}
                           </div>
                           <div className="ml-4">
                             <h3 className="text-sm text-gray-400 font-medium">Question {currentQuestionIndex + 1}</h3>
                             <div className="text-xs text-gray-500">Choose the best answer</div>
                           </div>
                         </div>
                         <h3 className="text-xl font-semibold mb-6 text-white leading-relaxed">
                           {assignmentData.questions[currentQuestionIndex].question}
                         </h3>
                       </div>

                       <div className="space-y-4">
                         {assignmentData.questions[currentQuestionIndex].options.map((option, index) => (
                           <motion.button
                             key={index}
                             onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                             whileHover={{ scale: 1.01 }}
                             whileTap={{ scale: 0.99 }}
                             className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 group ${
                               selectedAnswers[currentQuestionIndex] === index
                                 ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                                 : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:border-gray-500 hover:text-white'
                             }`}
                           >
                             <div className="flex items-center space-x-4">
                               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                 selectedAnswers[currentQuestionIndex] === index
                                   ? 'border-white bg-white'
                                   : 'border-gray-400 group-hover:border-gray-300'
                               }`}>
                                 {selectedAnswers[currentQuestionIndex] === index && (
                                   <motion.div 
                                     initial={{ scale: 0 }}
                                     animate={{ scale: 1 }}
                                     className="w-3 h-3 rounded-full bg-blue-600"
                                   />
                                 )}
                               </div>
                               <div className="flex-1">
                                 <div className="flex items-center space-x-3">
                                   <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                                     selectedAnswers[currentQuestionIndex] === index
                                       ? 'bg-white/20 text-white'
                                       : 'bg-gray-600 text-gray-400 group-hover:bg-gray-500 group-hover:text-white'
                                   }`}>
                                     {String.fromCharCode(65 + index)}
                                   </span>
                                   <span className="font-medium">{option}</span>
                                 </div>
                               </div>
                             </div>
                           </motion.button>
                         ))}
                       </div>
                     </motion.div>

                     {/* Enhanced Navigation */}
                     <div className="flex justify-between items-center bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                       <motion.button
                         onClick={handlePreviousQuestion}
                         disabled={currentQuestionIndex === 0}
                         whileHover={{ scale: currentQuestionIndex === 0 ? 1 : 1.05 }}
                         whileTap={{ scale: currentQuestionIndex === 0 ? 1 : 0.95 }}
                         className="px-6 py-3 bg-gray-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition-all duration-200 font-medium"
                       >
                         ← Previous
                       </motion.button>
                       
                       <div className="text-center">
                         <div className="text-sm text-gray-400 mb-1">Progress</div>
                         <div className="text-lg font-semibold text-white">
                           {Object.keys(selectedAnswers).length} / {assignmentData.questions.length}
                         </div>
                         <div className="text-xs text-gray-500">questions answered</div>
                       </div>
                       
                       {currentQuestionIndex === assignmentData.questions.length - 1 ? (
                         <motion.button
                           onClick={handleSubmitTest}
                           disabled={Object.keys(selectedAnswers).length !== assignmentData.questions.length}
                           whileHover={{ scale: Object.keys(selectedAnswers).length !== assignmentData.questions.length ? 1 : 1.05 }}
                           whileTap={{ scale: Object.keys(selectedAnswers).length !== assignmentData.questions.length ? 1 : 0.95 }}
                           className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-500 hover:to-emerald-500 transition-all duration-200 font-medium shadow-lg"
                         >
                           Submit Test ✓
                         </motion.button>
                       ) : (
                         <motion.button
                           onClick={handleNextQuestion}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 font-medium shadow-lg"
                         >
                           Next →
                         </motion.button>
                       )}
                     </div>
                   </>
                 ) : (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, ease: "easeOut" }}
                     className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-700 shadow-2xl text-center"
                   >
                     {/* Enhanced Results Section */}
                     <div className="mb-8">
                       <motion.div
                         initial={{ scale: 0 }}
                         animate={{ scale: 1 }}
                         transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                       >
                         {score >= Math.ceil(assignmentData.questions.length * 0.7) ? (
                           <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                             <CheckCircleIcon className="h-16 w-16 text-white" />
                           </div>
                         ) : (
                           <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                             <XCircleIcon className="h-16 w-16 text-white" />
                           </div>
                         )}
                       </motion.div>
                       
                       <motion.h2 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                         className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                       >
                         {score >= Math.ceil(assignmentData.questions.length * 0.7) ? 'Congratulations! 🎉' : 'Test Not Passed 📚'}
                       </motion.h2>
                       
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4 }}
                         className="mb-6"
                       >
                         <div className="text-3xl font-bold mb-2 text-white">
                           {score} / {assignmentData.questions.length}
                         </div>
                         <div className="text-lg text-gray-400 mb-4">
                           {Math.round((score / assignmentData.questions.length) * 100)}% Score
                         </div>
                         <div className="w-64 bg-gray-700 rounded-full h-4 mx-auto overflow-hidden">
                           <motion.div 
                             className={`h-4 rounded-full ${
                               score >= Math.ceil(assignmentData.questions.length * 0.7) 
                                 ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                 : 'bg-gradient-to-r from-red-500 to-pink-500'
                             }`}
                             initial={{ width: 0 }}
                             animate={{ width: `${(score / assignmentData.questions.length) * 100}%` }}
                             transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                           />
                         </div>
                       </motion.div>
                       
                       <motion.p 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.6 }}
                         className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto"
                       >
                         {score >= Math.ceil(assignmentData.questions.length * 0.7)
                           ? 'Excellent work! You have successfully completed this assignment and demonstrated a strong understanding of the material.' 
                           : `You need at least ${Math.ceil(assignmentData.questions.length * 0.7)} correct answers (70%) to pass. Review the study material and try again when you're ready.`
                         }
                       </motion.p>
                     </div>

                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.7 }}
                       className="flex justify-center space-x-4"
                     >
                       {score < Math.ceil(assignmentData.questions.length * 0.7) && (
                         <motion.button
                           onClick={handleRetakeTest}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 font-medium shadow-lg"
                         >
                           📚 Study & Retake Test
                         </motion.button>
                       )}
                       <motion.button
                         onClick={() => navigate('/student-portal')}
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         className="px-8 py-4 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all duration-200 font-medium"
                       >
                         🏠 Back to Portal
                       </motion.button>
                     </motion.div>
                   </motion.div>
                 )}
               </motion.div>
             </div>
           </div>
         )}
       </div>
     </div>
   );
 };

export default AssignmentPage;