
import PDFDictionary from "./PDFDictionary.mjs";
import { CRLF, objectToPostScript } from "./common.mjs";

///
const decoder = new TextDecoder();

/** PDFStream
 *
 */
export default class PDFStream extends PDFDictionary {
	
	#data = '';
	
	constructor( data = '', object ) {

		super( object );
		
		this.#data = data;
		
		if( !('Length' in this) )
			this.Length = 0;
		
	}
	
	get stream() {
		
		return this.#data;
		
	}

	set stream( values ) {
		
		this.#data = values;
		
	}

	toString() {
		
		let stream = this.#data;
		
		if( stream instanceof Uint8Array )
			stream = decoder.decode( stream );
		
		this.Length = stream.length;
		
		return this.getObjectHeader() + CRLF + objectToPostScript( this ) + CRLF + 
				'stream'+ CRLF + stream + CRLF +'endstream'+ CRLF +'endobj';
		
	}
	
}
