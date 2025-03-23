# pdf-javascript

Esse projeto surgiu da necessidade de gerar arquivos PDF que seriam interpretados por um plotter.
Como foi desenvolvido para operar em navegador web, falta implementar alguns recursos para funcionar com Node.JS.

**Referencias**
- [PDF32000_2008.pdf](https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/PDF32000_2008.pdf)


## Uso basico

Nesse exemplo é gerado um arquivo PDF com o "Hello World!" no canto inferior esquerdo da página.

```javascript

/// importa os recursos utilizados
import { PDF, PDFPage, PDFStream } from "../source/index.mjs"

/// cria um novo documento
let doc = PDF.Create();

/// cria nova pagina
let page = new PDFPage();

/// indica o uso da fonte pela pagina
    page.use( PDF.Fonts.COURIER );



let fontSize = 4;
let px = 20;
let py = 20;

/// inicia um contexto de renderização
let content = new PDF.Path2D();

/// define a cor
content.fillColor( new PDF.Color( 0xff0000 ) );

/// escreve um hello world
content.fillText( 'Hello World!', px, py, fontSize, PDF.Fonts.COURIER );

/// adiciona o conteudo à pagina
page.append( new PDFStream( content ) );

/// adiciona a pagina ao documento
doc.attach( page );



/// cria um iframe no body da pagina para vizualizar o documento
doc.preview( document.body, innerWidth, innerHeight );

/// para abrir um popup
doc.open();

/// para baixar o arquivo
doc.download();

```

## Visualizar os exemplos

Para visualizar os exemplos de [docs/](docs/), será preciso iniciar um servidor local, no exmplo a seguir utilizamos o python para iniciar um servidor simples.
Em seguida, abra o localhost em um browser.

```
git clone https://github.com/devConcordia/pdf-javascript.git

cd pdf-javascript

python -m http.server
```

