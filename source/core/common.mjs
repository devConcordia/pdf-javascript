
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
