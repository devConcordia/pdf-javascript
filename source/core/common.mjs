
///
export const VOID = '';
export const LF = String.fromCharCode( 0x0A );
export const CR = String.fromCharCode( 0x0D );
export const SP = String.fromCharCode( 0x20 );
export const CRLF = CR + LF;

///
let UID_COUNT = 0;

/** getUID( type )
 *
 *	@param {String} type
 *	@return {String}
 */
export function getUID( type ) {
	
	return (type.slice(3,5) + (UID_COUNT++).toString(16).toUpperCase());

}

/** toPostScript
 *	
 *	@param {*} input
 *	@return {String}
 */
function toPostScript( input ) {
	
	if( input === undefined ) return VOID;
	if( input === null ) return "null";
	
	/// if is an instance of a any basic PDF object
	if( (/^PDF/).test( input.constructor.name ) ) {
		
		return input.getObjectR();
		
	} else if( input instanceof Array ) {
		
		return arrayToPostScript( input );
		
	} else if( typeof input == "object" ) {
		
		return objectToPostScript( input );
		
	} else {
		
		switch( typeof input ) {
			
			case 'number':
					return input.toString();
				break;
				
			case 'boolean':
					return ( input === true )? 'true' : 'false';
				break;
				
			case 'string':
					
					let e = input.charAt(0);
					
					if( e != '<' && e != '(' )
						return (input === '')? '' : '/'+ input;
					
					return input;
					
				break;
			
		}
		
	}
	
	return VOID
	
}

/** arrayToPostScript
 *	
 *	@param {Array} input
 *	@return {String}
 */
export function arrayToPostScript( input ) {
	
	let output = [];
	
	for( let value of input ) {
		
		if( value === undefined ) continue;
		
		output.push( toPostScript( value ) );
		
	}
	
	return "["+ output.join( SP ) +"]"
	
}

/** objectToPostScript
 *
 *	@param {Object} object
 *	@return {String}
 */
export function objectToPostScript( object ) {

	let output = [];

	for( let key in object ) {
		
		let value = object[ key ];
		
		if( value === undefined ) continue;
		
		output.push( '/' + key + SP + toPostScript( value ) );
	
	}


	return "<<"+ output.join(SP) +">>"

}
