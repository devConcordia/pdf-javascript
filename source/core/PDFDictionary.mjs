
import PDFObject from "./PDFObject.mjs";
import { CRLF, objectToPostScript } from "./common.mjs";

/** PDFDictionary
 *	
 *	@ref 7.3.7 Dictionary Objects
 *	
 */
export default class PDFDictionary extends PDFObject(Object) {
	
	constructor( object ) {
		
		super();
		
		if( typeof object == "object" )
			Object.assign(this, object);
		
	}
	
	toString() {
		
		return this.getObjectHeader() + CRLF + objectToPostScript( this ) + CRLF +'endobj'
		
	}
	
}
