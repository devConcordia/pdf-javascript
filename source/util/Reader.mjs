
import PDFDictionary from "../core/PDFDictionary.mjs"
import PDFArray from "../core/PDFArray.mjs"
import PDFString from "../core/PDFString.mjs"
import PDFNumber from "../core/PDFNumber.mjs"
import PDFStream from "../core/PDFStream.mjs"
import PDFTrailer from "../core/PDFTrailer.mjs"

/** isNumeric
 *	
 *	@ref https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
 *	
 *	@param {String} input
 */
function isNumeric( input ) {
	
	if( typeof input != "string" ) return false;
	
	return !isNaN( input ) && !isNaN( parseFloat(input) )
	
}


function parseDictionary( input ) {
	
	input = input.replace(/\\\r/gm, " ");
	input = input.replace(/\\\r\n/gm, " ");
	input = input.replace(/\r\n|\n/gm, " ");
	input = input.replace( /^\d+\s\d+\sobj/g, "" );
	input = input.replace( /endobj$/g, "" );
	
	input = input.replace( /\//g, " /" );
	
//	input = input.replace( /\(/g, " (" );
//	input = input.replace( /\)/g, ") " );
	
	input = input.replace( /\<\>/g, "< >" );
	input = input.replace( /\>\</g, "> <" );
	
	input = input.replace( /\<\<\<\</g, " << <<" );
	input = input.replace( /\>\>\>\>/g, ">> >> " );
	
	input = input.replace( /\<\<\</g, " << <" );
	input = input.replace( /\>\>\>/g, "> >> " );
	
	input = input.replace( /\<\</g, " << " );
	input = input.replace( /\>\>/g, " >> " );
	
	input = input.replace( /\[/g, " [ " );
	input = input.replace( /\]/g, " ] " );
	
	input = input.replace(/\s+/gm, " ");
	
	input = input.replace(/\d+\s\d+\sR/gm, function(e) { return e.replace(/\s/gm, "_") });
				
	return input.trim();
	
}


function splitDictionary( input ) {
	
	let output = [];
	let current = "";
	
	let i = 0;
	
	while( i < input.length ) {
		
		let c0 = input.charAt(i);
		
		if( c0 == " " ) {
			
			output.push( current );
			current = "";
			
		} else if( c0 == "(" ) {
			
			output.push( current );
			
			current = c0;
			
			let j = i+1;
			
			while(true) {
				
				let c1 = input.charAt(j);
				
				current += c1;
				
				if( c1 == ")" && (input.charAt(j-1) != "\\") ) break;
				
				j++;
				
			}
			
			i = j+1;
			
			current = current.replace(/\s+\//gm, "/");
			
			output.push( current );
			current = "";
			
		} else {
			
			current += c0;
			
		}
		
		i++;
		
	}
	
	if( current != "" )
		output.push( current );
	
	return output;
	
}


function readUntil( input, charEnd ) {
	
	let output = [];
	
	while( input.length > 0 ) {
		
		let target = input.shift();
		
		if( target == charEnd ) {
			
			return output;
			
		} else {
			
			if( target == "[" ) {
				
				output.push( readUntil( input, "]" ) );
				
			} else if( target == "<<" ) {
				
				let data = readUntil( input, ">>" );
				
				let object = new Object;
				
				for( let i = 0; i < data.length; i+=2 )
					object[ data[i] ] = data[i+1];
				
				output.push( object );
				
			} else {
				
				if( target.charAt(0) == "/" ) {
					
					target = target.replace(/^\//, "")
					
				} else if( isNumeric(target) ) {
					
					target = parseFloat( target );
					
				} else if( target == "null" ) {
					
					target = null;
					
				}
				
				output.push( target );
				
			}
			
		}
		
	}
	
	return output[0];
	
}

function read( input ) {
	
	let data = splitDictionary( input );
	
	if( data[0] == "<<" ) {
		
		return readUntil( data, ">>" );
		
	} else if( data[0] == "[" ) {
		
		return readUntil( data, "]" );
		
	} else {
		
	//	console.log( input )
		
		return input;
		
	}
	
}

function replaceId( index, object ) {
	
	for( let key in object ) {
		
		let value = object[ key ];
		
		if( typeof value == "object" ) {
			
			replaceId( index, value );
			
		} else {
		
			if( (/^\d+\_\d+\_R$/).test( value ) ) {
				
				let id = value.replace(/\_/g, " ").replace(/R$/, "obj");
				
			//	console.log( id );
				
				object[ key ] = index[ id ];
				
			}
		
		}
		
	}
	
}


const decoder = new TextDecoder();

function ReadObjects( text, buffer ) {
	
	/// 
	let objects = new Object;
	
	text.match(/^\d+\s\d+\sobj/gm).forEach(function(e) {
		
		let i = text.indexOf( "\r\n"+ e );
		
		let CRLF_SIZE = 2;
		
		/// caso não seja crlf
		if( i == -1 ) {
			
			CRLF_SIZE = 1;
			i = text.indexOf( "\n"+ e ) + 1;
		
		} else {
			
			i += 2;
			
		}
		
		let j = text.indexOf( "endobj", i );
		
		let content = text.slice( i, j+6 );
		
		let n = content.indexOf( "stream" );
		
		if( n != -1 ) {
			
			let m = content.indexOf( "endstream", n );
			
			let data = parseDictionary( content.slice( 0, n ) );
				data = read( data );
			
			/// Há casos que pode ser somente LF(1)
			/// stream(6) + CRLF(2)
			/// CRLF(2) + endstream(9)
		//	let stream = buffer.slice( i + (n+6+CRLF_SIZE), i + (m - CRLF_SIZE) + 1 );
			let stream = buffer.slice( i + (n+6+CRLF_SIZE), i + (m - CRLF_SIZE) );
			
		//	console.log( stream.length, content.slice( n+8, m-2 ).length )
			
		//	console.log( decoder.decode(stream) )
		//	console.log( data )
			
			objects[ e ] = new PDFStream( stream, data );
			
		} else {
			
			content = parseDictionary( content );
			content = read( content );
			
			if( Array.isArray(content) ) {
				
				objects[ e ] = new PDFArray( content );
				
			} else if( typeof content == 'object' ) {
				
				objects[ e ] = new PDFDictionary( content );
				
			} else {
				
			//	console.log( content )
				
				if( /\d+/.test(content) ) {
					
					objects[ e ] = new PDFNumber( content );
					
				} else {
					
					objects[ e ] = new PDFString( content );
					
				}
				
			//	console.log( objects[ e ] )
			//	console.log( objects[ e ].toString() )
				
			}
			
		}
		
	});
	
//	console.log( objects );
	
	let trailer_i = text.indexOf( "trailer" ) + 7;
	let startxref_i = text.indexOf( "startxref" );
	
//	let trailer_i = text.lastIndexOf( "trailer" ) + 7;
//	let startxref_i = text.lastIndexOf( "startxref" );
	
	let trailer = parseDictionary( text.slice( trailer_i, startxref_i ) );
		trailer = new PDFTrailer( read( trailer ) );
	
	replaceId( objects, trailer );
	
	for( let key in objects ) {
		
		let [ on, gn, s ] = key.split(' ');
		
		let obj = objects[key];
			obj.setObjectR( on, gn );
		
		replaceId( objects, obj );
	
	}
	
	return { objects, trailer };
	
}

export { ReadObjects }
