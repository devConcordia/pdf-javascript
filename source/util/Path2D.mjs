
import { SP, CRLF } from "../core/common.mjs";

const DEG_TO_RAD = Math.PI/180;

let FLOAT_PRECISION = 4;

/** precision
 *	
 */
function precision( n ) { 
	
	return n.toFixed( FLOAT_PRECISION );

}


/** Path2D
 *
 */
export default class Path2D extends Array {
	
	static set PRECISION( v ) { 
		
		PRECISION = v;
	
	}
	
	constructor() {
		
		super();
		
		this.using = new Object;
		
	}
	
	///
	
	/** save
	 *
	 *	@return {Path2D} this
	 */
	save() {

		this.push('q');

		return this;

	}
	
	/** restore
	 *
	 *	@return {Path2D} this
	 */
	restore() {

		this.push('Q');

		return this;

	}
	
	do( object ) {
		
		var name = object.getObjectName();
		
		this.push( '/'+ name + SP +'Do' );

	}
	
	/// Matrix Transform
	
	transform( data, x, y ) {
		
		let d = '';
		
		for( let n of data ) 
			d += precision( parseFloat(n) ) + SP;
		
		this.push( d + SP + precision( x ) + SP + precision( y ) + SP + 'cm' );
		
		return this;

	}
	
	/** translate
	 *	
	 *	@param {Number} x, y
	 *	@return {Path2D} this
	 */
	translate( x, y = x ) {

		return this.transform([ 1, 0, 0, 1 ], x, y );

	}

	/** rotate
	 *	
	 *	@param {Number} angle
	 *	@return {Path2D} this
	 */
	rotate( angle = 0 ) {
		
		let c = Math.cos( angle ),
			s = Math.sin( angle );

		return this.transform([ c, -s, s, c ], 0, 0 );

	}

	/** scale
	 *	
	 *	@param {Number} sx, sy
	 *	@return {Path2D} this
	 */
	scale( sx, sy = sx ) {

		return this.transform([ sx, 0, 0, sy ], 0, 0 );

	}
	
	/** skew
	 *	
	 *	@param {Number} ax, ay
	 *	@return {Path2D} this
	 */
	skew( ax, ay ) {

		this.push( path2d_transform([ 1, ax, ay, 1 ], 0, 0 ) );

		return this;

	}
	
	/// colors
	
	/** strokeColor
	 *
	 *	@param {PDFColorSpace | TypedArray} color
	 *	@return {Path2D} this
	 */
	strokeColor( color ) {

		if( color.constructor.name == "PDFColorSpace" ) {

			let name = color.getObjectName();
		
			this.push( '/' + name + SP + 'CS 1.0000 SCN' );
			
			if( !(name in this.using) ) this.using[ name ] = color;
			
		} else {

			switch( color.length ) {

				case 3:
						this.push( color.join( SP ) + SP + 'RG' );
					break;

				case 4:
						this.push( color.join( SP ) + SP + 'K' );
					break;

				default:
						console.warn('PDFStream.strokeColor: @param \'color\' is incompatible', color);
					break;
			}

		}

		return this;

	}
	
	/** fillColor
	 *
	 *	@param {PDFColorSpace | Array} color
	 *	@return {Path2D} this
	 */
	fillColor( color ) {

		if( color.constructor.name == "PDFColorSpace" ) {

			var name = color.getObjectName();

			this.push( '/' + name + SP + 'cs 1.0000 scn' );

			if( !(name in this.using) ) this.using[ name ] = color;

		} else {

			switch( color.length ) {

				case 3:
						this.push( color.join( SP ) + SP + 'rg' );
					break;

				case 4:
						this.push( color.join( SP ) + SP + 'k' );
					break;

				default:
						console.warn('PDFStream.fillColor: @param \'color\' is incompatible', color);
					break;
			}

		}

		return this;

	}
	
	/** lineWidth
	 *	
	 *	@param {Number} w
	 *	@return {Path2D} this
	 */
	lineWidth( w ) {

		this.push( precision( w ) + SP + 'w' );

		return this;

	}
	
	/** miter
	 *	
	 *	@param {Number} w
	 *	@return {Path2D} this
	 */
	miter( w ) {

		this.push( w + SP +'M' );

		return this;

	}
	
	/** lineDashPattern
	 *	
	 *	@param {Array} array
	 *	@param {Number} phase
	 *	@return {Path2D} this
	 */
	lineDashPattern( data, phase = 0 ) {
		
		let d = '';
	
		for( let n of data ) 
			d += precision( n ) + SP;
		
		this.push('['+ d +']'+ SP + precision( phase ) + SP +'d');

		return this;

	}
	
	///
	
	/** stroke
	 *	
	 *	S false
	 *	s true
	 *	
	 *	@param {Boolean} closed
	 *	@return {Path2D} this
	 */
	stroke( closed = false ) {

		this.push( (closed == true)? 's' : 'S' );

		return this;

	}
	
	/** fill
	 *
	 *	@param {Boolean} rule
	 *	@return {Path2D} this
	 */
	fill( rule = false ) {

		this.push( 'f'+ (rule == true? '*' : '') );

		return this;

	}
	
	/** both
	 *
	 *	@param {Boolean} closed, rule
	 *	@return {Path2D} this
	 */
	both( closed = false, rule = false ) {

		this.push( ((closed == true)? 'b' : 'B') + (rule == true? '*' : '') );

		return this;

	}
	
	/** 
	 *	
	 */
	clip( rule = false ) {
		
		this.push( rule? 'W*' : 'W' );

		return this;

	}
	
	///
	
	/** moveTo
	 *
	 *	@param {Number} x, y
	 *	@return {Path2D} this
	 */
	moveTo( x, y ) {

		this.push( precision( x ) + SP + precision( y ) + SP + 'm' );

		return this;

	}

	/** lineTo
	 *
	 *	@param {Number} x, y
	 *	@return {Path2D} this
	 */
	lineTo( x, y ) {

		this.push( precision( x ) + SP + precision( y ) + SP + 'l' );

		return this;

	}

	/** close
	 *
	 *	@param {Number} x, y
	 *	@return {Path2D} this
	 */
	close( x, y ) {

		this.push( 'h' );

		return this;

	}

	/** rect
	 *
	 *	@param {Number} x, y, w, h, rh, rv, points
	 *	@return {Path2D} this
	 */
	rect( x, y, w, h ) {

		this.push( 
			precision( x ) + SP +
			precision( y ) + SP +
			precision( w ) + SP +
			precision( h ) + SP + 're' );

		return this;

	}

	/** curve
	 *
	 *	@param {Number} ax, ay, bx, by, cx, cy
	 *	@return {Path2D} this
	 */
	curve( ax, ay, bx, by, cx, cy ) {

		this.push( precision( ax ) + SP + precision( ay ) + SP +
			precision( bx ) + SP + precision( by ) + SP +
			precision( cx ) + SP + precision( cy ) + SP + 'c' );

		return this;

	}
	
	/** circle
	 *
	 *	@param {Number} x, y, radius, points
	 *	@return {Path2D} this
	 */
	circle( px, py, radius, points = 36 ) {
		
		this.ellipse( px, py, radius, radius, points );
		
		return this;

	}
	
	/** ellipse
	 *	
	 *	@param {Number} x, y, rv, rh, points
	 *	@return {Path2D} this
	 */
	ellipse( px, py, rh, rv = rh, points = 36 ) {

		let step = Math.floor( 360 / points );
		
		this.moveTo( px + rh * Math.cos(0), py + rv * Math.sin(0) );
		
		for( let i = step; i < 360; i += step ) {
			
			let n = i * DEG_TO_RAD;
			
			this.lineTo( px + rh * Math.cos(n), py + rv * Math.sin(n) );
		
		}
		
		return this;

	}

	/** polygon
	 *
	 *	@param {Array} nodes [[x, y], [x, y], [ax,ay,bx,by,cx,cy],... ]
	 *	@return {Path2D} this
	 */
	polygon( input ) {
		
		this.moveTo( ...input[0] );
		
		///
		for( let i = 1; i < input.length; i++ ) {
			
			let e = input[i];
			
			if( e.length == 2 ) {
				
				this.lineTo( ...e );
				
			} else if( e.length == 6 ) {
				
				this.curve( ...e );
				
			} else {
				
				console.warn( 'Path2D.polygon: bad data', input );
				
			}
			
		}

		return this;

	}

	///

	/** fillText
	 *
	 *	@param {String} content
	 *	@param {Number} x
	 *	@param {Number} y
	 *	@param {Number} size
	 *	@param {PDFFont} font
	 *	@param {Object} options
	 *	@return {Path2D} this
	 */
	fillText( content, x, y, size, font, options = null ) {
		
		let name = font.getObjectName();
		
		if( !(name in this.using) ) 
			this.using[ name ] = font;
		
		
		let output = 'BT'+ CRLF;
			output += '/'+ font.getObjectName() + SP + precision( size ) + SP +'Tf'+ CRLF;
			output += precision( x ) + SP + precision( y ) + SP +'Td'+ CRLF;
			
		for( let key in options )
			output += options[ key ] + SP + key + CRLF;	
		
		///
		if( typeof content == 'string' ) {
			
			content = '('+ content +')';
			
		} else {
			
			content = '<'+ Array.from(content).map(e=>e.toString(16).padStart(2, '0')).join('') +'>';
			
		}
		
		this.push( output + content + SP +'Tj'+ CRLF +'ET');
		
		return this;
		
	}
	
	/** strokeText
	 *
	 *	@param {String} content
	 *	@param {Number} x
	 *	@param {Number} y
	 *	@param {Number} size
	 *	@param {PDFFont} font
	 *	@param {Object} options
	 *	@return {Path2D} this
	 */
	strokeText( content, x, y, size, font, options = null ) {
		
		let name = font.getObjectName();
		
		if( !(name in this.using) ) 
			this.using[ name ] = font;
		
		if( !options.hasOwnProperty('Tr') ) 
			options.Tr = 1;
		
		let output = 'BT'+ CRLF;
			output += '/'+ font.getObjectName() + SP + precision( size ) + SP +'Tf'+ CRLF;
			output += precision( x ) + SP + precision( y ) + SP +'Td'+ CRLF;
			
		for( let key in options )
			output += options[ key ] + SP + key + CRLF;	
		
		///
		if( typeof content == 'string' ) {
			
			content = '('+ content +')';
			
		} else {
			
			content = '<'+ Array.from(content).map(e=>e.toString(16).padStart(2, '0')).join('') +'>';
			
		}
		
		this.push( output + content + SP +'Tj'+ CRLF +'ET');
		
		return this;

	}
	
	///
	
	/** drawImage
	 *
	 *  @param {PDFImage} object
	 *  @param {Number} x, y, w, h, r
	 *	@return {Path2D} this
	 */
	drawImage( object, x, y, w, h, r = 0 ) {

		this.push( 'q' );

		this.translate( x, y );
		
		if( r != 0 ) 
			this.rotate( r );
		
		this.scale( w, h );
		
		let name = object.getObjectName();
		
		if( !(name in this.using) ) 
			this.using[ name ] = object;
		
		this.push( '/'+ name + SP +'Do' );
		this.push( 'Q' );

		return this;

	}

	toString() {
		
		let output = '';
		
		for( let line of this ) 
			output += line + CRLF;
		
		return output;
		
	}
	
}
