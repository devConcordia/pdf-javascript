
import PDFObject from "./PDFObject.mjs";
import { CRLF, arrayToPostScript } from "./common.mjs";

/** PDFArray
 *		
 *	@ref 7.3.6 Array Objects
 *	
 */
export default class PDFArray extends PDFObject(Array) {
	
	toString() {
		
		return this.getObjectHeader() + CRLF + arrayToPostScript( this ) + CRLF +'endobj'
		
	}
	
}
