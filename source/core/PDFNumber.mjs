
import PDFObject from "./PDFObject.mjs";
import { CRLF } from "./common.mjs";

/** PDFNumber
 *	
 *	@ref 7.3.3 Numeric Objects
 *	
 */
export default class PDFNumber extends PDFObject(Number) {

	toString() {
		
		return this.getObjectHeader() + CRLF + this.valueOf() + CRLF +'endobj'
		
	}
	
}
