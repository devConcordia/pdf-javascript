
import { CRLF, objectToPostScript } from "./common.mjs";

/** PDFTrailer
 *	
 */
export default class PDFTrailer {

	constructor( data ) {
		
		this.Root = undefined;
		this.Size = 1;
		
		for( let key in data ) 
			this[key] = data[key];
		
	}
	
	toString() {
		
		return 'trailer'+ CRLF + objectToPostScript( this ) + CRLF
		
	}

}
