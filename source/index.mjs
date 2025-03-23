
import PDFDictionary from "./core/PDFDictionary.mjs"
import PDFArray from "./core/PDFArray.mjs"
import PDFStream from "./core/PDFStream.mjs"
//import PDFTrailer from "./core/PDFTrailer.mjs"

import PDFAction from "./PDFAction.mjs"
import PDFAnnot from "./PDFAnnot.mjs"
import PDFCatalog from "./PDFCatalog.mjs"

import PDFFont from "./PDFFont.mjs"
import PDFImage from "./PDFImage.mjs"

import PDFPage from "./PDFPage.mjs"
import PDFExtGState from "./PDFExtGState.mjs"
import PDFPages from "./PDFPages.mjs"
import PDFXObject from "./PDFXObject.mjs"

import PDFDocument from "./PDFDocument.mjs"

import CMap from "./util/CMap.mjs";
import Color from "./util/Color.mjs";
import Path2D from "./util/Path2D.mjs";

import { ReadObjects } from "./util/Reader.mjs";



class PDF {
	
	static Fonts = {
		HELVETICA: new PDFFont( 'Helvetica' ),
		TIMES: new PDFFont( 'Times-Roman' ),
		COURIER: new PDFFont( 'Courier' )
	};
	
	static CMap = CMap;
	static Color = Color;
	static Path2D = Path2D;
	
	static Create() {
		
		let doc = new PDFDocument();
			doc.trailer.Root = new PDFCatalog();
			doc.trailer.Root.Pages = new PDFPages();
		
		doc.attach( doc.trailer.Root );
		
		return doc;
		
	}
	
	/** 
	 *	
	 */
	static Load( input ) {
		
		if( !(input instanceof ArrayBuffer) )
			throw "PDF.Load: @param \'input\' isn\'t a {ArrayBuffer}";
		
		let buffer = new Uint8Array( input );
		let text = "";
		
		for( let i = 0; i < buffer.length; i++ )
			text += String.fromCharCode( buffer[i] );
		
		///
		let { objects, trailer } = ReadObjects( text, buffer );
		
		///
		let doc = new PDFDocument();
			doc.trailer = trailer;
		
		doc.attach( doc.trailer.Root );
		
		for( let key in objects )
			doc.attach( objects[key] );
		
		return doc;
	
	}
	
}



export {
	
	PDFArray,
	PDFDictionary,
    PDFStream,
	
    PDFCatalog,
    PDFPages,
    PDFPage,
    PDFFont,
    PDFXObject,
    PDFImage,
    PDFAction,
    PDFAnnot,
    PDFExtGState,
	
    PDFDocument,
	PDF
	
}
