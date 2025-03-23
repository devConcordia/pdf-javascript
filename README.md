# pdf-javascript

This project arose from the need to generate PDF files for production on a plotter.
As it was developed to run in a web browser, some features still need to be implemented to work with Node.js.

**References**
- [PDF32000_2008.pdf](https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/PDF32000_2008.pdf)

## Basic usage

In this example, a PDF file is generated with the message "Hello World!" in the bottom left corner of the page.

```javascript

/// importing ...
import { PDF, PDFPage, PDFStream } from "../source/index.mjs"

/// create a document
let doc = PDF.Create();

/// create a page
let page = new PDFPage();

/// indicate a font type used by the page
    page.use( PDF.Fonts.COURIER );



let fontSize = 4;
let px = 20;
let py = 20;

/// init a 2d renderer
let content = new PDF.Path2D();

/// set a fill color
content.fillColor( new PDF.Color( 0xff0000 ) );

/// write "hello world"
content.fillText( 'Hello World!', px, py, fontSize, PDF.Fonts.COURIER );

/// add content to the page
page.append( new PDFStream( content ) );

/// add page to document
doc.attach( page );


/// display in an iframe
doc.preview( document.body, innerWidth, innerHeight );

/// open a popup
doc.open();

/// download
doc.download();

```

## See examples

To view the examples in [docs/](docs/), you need to start a local server. In the following example, we use Python to start a simple server.
Then, open the localhost in a web browser.

```
git clone https://github.com/devConcordia/pdf-javascript.git

cd pdf-javascript

python -m http.server
```

