
let FLOAT_PRECISION = 4;

/** precision
 *	
 */
function precision( n ) { 
	
	return n.toFixed( FLOAT_PRECISION );

}

/** parser
 *
 *	@param {Number} n
 *	@param {Number} max = 255
 *	@return {Number}
 */
function parser( n, max = 255 ) {

	if( Number.isInteger( n ) && n > 1 ) n /= max;

	return precision( Math.max( 0, Math.min( n, 1 ) ) )

}

/** Color
 *	
 */
export default class Color extends Float32Array {
	
	/** constructor
	 *
	 *	@param {Number} bytes	0xrrggbb
	 *	or
	 *	@param {Number} r
	 *	@param {Number} g
	 *	@param {Number} b
	 */
	constructor( r, g, b ) {

		if( arguments.length < 3 ) {
			
			let n = arguments[0] || 0;
			
			r = ( n >> 16 ) & 255;
			g = ( n >>  8 ) & 255;
			b = n & 255;
			
		}

		r = parser( r );
		g = parser( g );
		b = parser( b );

		super([ r, g, b ]);

	}

	get r() { return this[ 0 ] }
	get g() { return this[ 1 ] }
	get b() { return this[ 2 ] }

	set r( v ) { this[ 0 ] = parser( v ) }
	set g( v ) { this[ 1 ] = parser( v ) }
	set b( v ) { this[ 2 ] = parser( v ) }
	
	get hex() {
		
		let [ r, g, b ] = this;
		
		r = Math.floor(r*256);
		g = Math.floor(g*256);
		b = Math.floor(b*256);
		
		return b | g << 8 | r << 16;
		
	}

	get cmyk() {
		
		let [ r, g, b ] = this;
		
		let c = 0, 
			m = 0, 
			y = 0,
			k = 1 - Math.max( r, g, b );

		if( k != 1 ) {
			
			c = ( 1-r-k )/( 1-k );
			m = ( 1-g-k )/( 1-k );
			y = ( 1-b-k )/( 1-k );

		}

		return [ c, m, y, k ].map( precision );

	}
	
	toString() {
		
		return '#'+ ('000000' + this.hex).slice( -6 ).toUpperCase()
		
	}
	
}
