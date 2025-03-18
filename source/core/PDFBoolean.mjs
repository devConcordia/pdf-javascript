
import PDFObject from "./PDFObject.mjs";
import { CRLF } from "./common.mjs";

/** PDFBoolean
 *	
 *	@ref 7.3.2 Boolean Objects
 *	
 */
export default class PDFBoolean extends PDFObject(Boolean) {
	
	toString() {
		
		return this.getObjectHeader() + CRLF + this.valueOf() + CRLF +'endobj'
		
	}
	
}
