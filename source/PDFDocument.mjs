
import { CRLF, SP } from "./core/common.mjs"

import PDFDictionary from "./core/PDFDictionary.mjs"
import PDFTrailer from "./core/PDFTrailer.mjs"
import PDFArray from "./core/PDFArray.mjs"

import PDFCatalog from "./PDFCatalog.mjs"
import PDFPages from "./PDFPages.mjs"
import PDFPage from "./PDFPage.mjs"

/**	PDFDocument
 *
 *	@param {String}	name
 *	@param {Number} version
 */
export default class PDFDocument {
	
	#name = 'pdf-document';
	#version = '1.6';
	
	#blob = null;
	#url = null;
	
	#cache = null;
	
	constructor( name = 'pdf-document', version = '1.6' ) {
		
		this.#name = name;
		this.#version = version;
		
		///
		this.trailer = new PDFTrailer();
		
	}
	
	get Pages() {
		
		if( this.trailer )
			return this.trailer.Root.Pages;
		
		return null;
		
	}
	
	get blob() {
		
		return this.#blob || this.createBlob()
		
	}

	get URL() {
		
		if( this.#url == null )
			this.createBlob();

		return this.#url

	}

	updateXRef() {
		
		let i = 1;
		
		for( let key in this ) {
			
			if( key != 'trailer' )
				this[ key ].setObjectR( i++, 0 );
		
		}
		
	}
	
	/**	attach
	 *
	 *	@param {PDFDictionary} arguments
	 */
	attach() {

		for( let object of arguments ) {
			
			if( object instanceof PDFDictionary || object instanceof PDFArray ) {

				let name = object.getObjectName();

				if( object instanceof PDFPage ) this.Pages.append( object );

				if( this[ name ] === undefined )
					this[ name ] = object;
				
				/// procura por child objects
				/// e attach caso não existam nesse contexto
				attach_object( this, object );

			} else {

				console.warn( 'PDFDocument.attach: @param is\'t a PDFDictionary', object );

			}

		}

	}

	/**	open
	 *
	 *	@param {Number} width
	 *	@param {Number} height
	 *	@return {Window}
	 */
	open( width = 420, height = 594 ) {

		var x = (innerWidth - width)/2,
			y = (innerHeight - height)/2;

		return window.open( this.URL, '_blank', 'width='+ width +',height='+ height +',top='+ y +',left='+ x );

	}

	/**	open
	 *
	 *	@param {HTMLElement} parentNode
	 *	@param {Number} width
	 *	@param {Number} height
	 *	@param {Object} data				Optional
	 *	@return {HTMLElementIframe}
	 */
	preview( parentNode, w, h, data ) {

		let string = '';

		if( data ) {

			string += '#';

			for( let key in data ) 
				string += ((string == '')? '' : '&') + key +'='+ data[ key ];

		}
		
		let iframe = document.createElement( 'iframe' );
			iframe.src = this.URL + string;
			iframe.width = w || parentNode.clientWidth;
			iframe.height = h || parentNode.clientHeight;
			iframe.style.border = 'none';

		if( parentNode instanceof HTMLElement )
			parentNode.appendChild( iframe );

		return iframe

	}

	/**	open
	 *
	 *	@param {String} filename		Optional
	 */
	download( filename = this.name ) {

		let link = document.createElement('a');

		document.body.appendChild( link );

		link.download = filename + '.pdf';
		link.href = this.URL;
		link.click();
		link.remove();

	}

	/** createBlob
	 *
	 * 	@ref https://stackoverflow.com/questions/32510273/javascript-blob-encoding-as-utf-8-instead-of-ansi
	 *
	 *	@return {Blob}
	 */
	createBlob() {

		if( this.#url != null )
			URL.revokeObjectURL( this.#url );

		let blob = new Blob([ this.toBuffer() ], { type:'application/pdf' });
		
		this.#blob = blob;
		this.#url = URL.createObjectURL( blob );

		return blob;

	}

	toDataURL() {
		
		return 'data:application/pdf;base64,'+ btoa(this.toString());
		
	}
	
	/** toBuffer
	 *	
	 *	@return {Uint8Array}
	 */
	toBuffer() {
		
		let source = this.toString(),
			length = source.length,
			buffer = new Uint8Array( length );
	
		for( let i = 0; i < length; i++ )
			buffer[ i ] = source.charCodeAt( i );
		
		return buffer
		
	}
	
	/** toString
	 *
	 *	@return {String}
	 */
	toString( force = false ) {

		if( force || this.#cache != null ) return this.#cache;

		let output = '%PDF-' + this.#version + CRLF;
		//	output += "%âãÏÓ" + CRLF;
		//	output += "\u0025\u00e2\u00e3\u00cf\u00d3" + CRLF;
		
		
		///
		this.updateXRef();
		
		///
		this.trailer.Size = Object.keys( this ).length + 1;
		
		for( let key in this ) {
			if( key != 'trailer' )
				output += this[ key ].toString() + CRLF;
		}
		
		/// cross-reference table - xref
		output += 'xref'+ CRLF
				+'0'+ SP + this.trailer.Size + CRLF
				+'0000000000 65535 f'+ CRLF;

		for( let key in this ) {

			if( key == 'trailer' ) continue;
				
			let offset = output.indexOf( this[ key ].getObjectHeader() );

			output += ( '0000000000'+ offset ).slice( -10 ) +' 00000 n'+ CRLF;

		}

		output += this.trailer.toString();
		
		return output +'startxref'+ CRLF + output.indexOf( 'xref' ) + CRLF +'%%EOF';

	}
	
}


/** attach_array
 *
 *	@param {PDFDocument} target
 *	@param {Array} array
 */
function attach_array( target, array ) {

	for( let item of array ) {

		if( item instanceof PDFDictionary || item instanceof PDFArray ) {

			if( target[ item.getObjectName() ] === undefined ) {

				target.attach( item );

			}

		} else if( typeof value == 'object' ) {

			attach_object( target, value );

		}

	}

};

/** attach_object
 *
 *	@param {PDFDocument} target
 *	@param {Object} object
 */
function attach_object( target, object ) {

	for( let key in object ) {

		if( object.hasOwnProperty( key ) === false ) continue;

		let value = object[ key ];

		if( value instanceof PDFDictionary || value instanceof PDFArray ) {
		
			if( target[ value.getObjectName() ] === undefined ) {

				target.attach( value );

			}

		} else if( Array.isArray( value ) ) {

			attach_array( target, value );

		} else if( typeof value == 'object' ) {

			attach_object( target, value );

		}

	}

};
