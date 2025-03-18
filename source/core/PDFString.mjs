
import PDFObject from "./PDFObject.mjs";
import { CRLF } from "./common.mjs";

/** PDFString
 *	
 *	@ref 7.3.4 String Objects
 *	
 *		7.3.4.2 Literal Strings
 *		7.3.4.3 Hexadecimal Strings
 *	
 */
export default class PDFString extends PDFObject(String) {
	
	toString() {
		
		return this.getObjectHeader() + CRLF +"/"+ this.valueOf() + CRLF +'endobj'
		
	}
	
	static HexadecimalEncode( input, fill = '00' ) {
		
		var output = '',
			length = fill.length;
		
		if( !(typeof input == 'string') )
			input = input.toString();
		
		for( var e of input ) output += ( fill + e.charCodeAt().toString( 16 ) ).slice( -length );
		
		return output;

	}
	
	static HexadecimalDecode( input ) {

		if( !(typeof input == 'string') )
			input = input.toString();
		
		input = input.replace( /[<>]/g, '' );
		
		var output = '';
		
		for( var i = 0; i < input.length; i += 2 ) {
			
			var code = input.charAt( i ) + input.charAt( i+1 );
			
			output += String.fromCharCode( parseInt( code, 16 ) );
			
		}
		
		return output;
		
	}
	
}
