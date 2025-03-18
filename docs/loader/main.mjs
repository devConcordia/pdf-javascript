
import FileLoader from "./FileLoader.mjs"
import { PDF, PDFStream } from "../../source/index.mjs"


window.addEventListener('load', function(e) {
	
	FileLoader.Load("./document.pdf", "arraybuffer", function( bytes ) {
		
		let doc = PDF.Load( bytes );
		
		console.log( doc )
		
		let header = createHeaderContent( "New Header Title" );
		
		doc.attach( header );
		
		for( let page of doc.trailer.Root.Pages.Kids ) {
			
			/// se o conteudo não for um array
			if( !Array.isArray( page.Contents ) )
				page.Contents = [ page.Contents ];
			
			page.Contents.push( header );
		
		}
		
		doc.preview( document.body, innerWidth, innerHeight );
	//	doc.download();
		
	//	document.write( '<pre>'+ doc.toString().replace(/\</gm, '&lt;').replace(/\>/gm, '&gt;') +'</pre>' )
		
	});
	
}, false);
	

function createHeaderContent( title ) {
	
	var content = new PDF.Path2D();
	//	content.scale( PDF.MM, PDF.MM );
		content.fillColor( new PDF.Color( 0xff0000 ) );
		content.fillText( title, 80, 284, 6, PDF.Fonts.HELVETICA );
	
	return new PDFStream( content );
	
}


