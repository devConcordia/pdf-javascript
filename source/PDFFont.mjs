
import PDFDictionary from "./core/PDFDictionary.mjs";

/** PDFFont
 *	
 *	Base:
 *		Helvetica
 *		Helvetica-Bold
 *		Helvetica-Oblique
 *		Helvetica-BoldOblique
 *		Times-Roman
 *		Times-Bold
 *		Times-Italic
 *		Times-BoldItalic
 *		Courier
 *		Courier-Bold
 *		Courier-Oblique
 *		Courier-BoldOblique
 *		Symbol
 *	
 */
export default class PDFFont extends PDFDictionary {
	
	/** constructor
	 *	
	 *	@param {String} base
	 *	@param {String} subtype
	 *	@param {String} encode
	 */
	constructor( base = 'Helvetica', subtype = 'Type1', encode = 'WinAnsiEncoding' ) {
		
		super();
		
		this.Type = 'Font';
		this.Subtype = subtype;
		this.BaseFont = base;
		
		if( typeof encode == 'string' )
			this.Encoding = encode;
		
	}
	
}
