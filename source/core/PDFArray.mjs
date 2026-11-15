
import PDFObject from "./PDFObject.mjs";
import { CRLF } from "./common.mjs";
import { arrayToPostScript } from "./builder.mjs";

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
