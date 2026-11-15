import {VOID, SP} from './common.mjs'
import PDFObject from './PDFObject.mjs'

/** toPostScript
 *
 *	@param {*} input
 *	@return {String}
 */
function toPostScript( input ) {

	if( input === undefined ) return VOID;
	if( input === null ) return "null";

	// console.log( input.constructor.name, input instanceof PDFObject )

	//if( input.isPDFObject === true ) {
	if( input instanceof PDFObject ) {

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
