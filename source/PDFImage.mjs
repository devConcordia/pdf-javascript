
import PDFXObject from "./PDFXObject.mjs";


var imageCanvas = document.createElement('canvas'),
    imageContext = imageCanvas.getContext('2d');

/** image_get_jpeg_base64
 *
 *	@param {HTMLImageElmenet} image
 *	@return {String}
 */
function image_get_jpeg_base64( image ) {

	var w = image.naturalWidth,
		h = image.naturalHeight;

	imageCanvas.width = w;
	imageCanvas.height = h;

	imageContext.fillStyle = '#ffffff';
	imageContext.fillRect( 0, 0, w, h );

	imageContext.drawImage( image, 0, 0, w, h );

	return imageCanvas.toDataURL( 'image/jpeg' )

}

/** image_get_jpeg_stats
 *
 *		device === 1		DeviceGray
 *		device === 3		DeviceRGB
 *		device === 4		DeviceCMYK
 *
 *	@param {String} data		atob( <string>.replace( /data\:image\/jpeg;base64,/, '' ) )
 *	@return {Object}
 */
function image_get_jpeg_stats( data ) {

	var i = 4,
		width = 0,
		height = 0,
		device = 0,
		bits = 0,
		block = data.charCodeAt( 4 ) * 256 + data.charCodeAt( 5 );

	while( i < data.length ) {

		i += block;

		if( data.charCodeAt( i+1 ) === 0xc0 ) {

			height = data.charCodeAt( i+5 ) * 256 + data.charCodeAt( i+6 );
			width = data.charCodeAt( i+7 ) * 256 + data.charCodeAt( i+8 );

			bits = data.charCodeAt( i+4 );	/// BitsPerComponent???
			device = data.charCodeAt( i+9 );

			break;

		} else {

			i += 2;
			block = data.charCodeAt( i ) * 256 + data.charCodeAt( i+1 );

		}
	}

	return { width, height, bits, device }

}

/** image_create_jpeg
 *
 *	@param {String} color
 *	@return {String}
 */
function image_create_jpeg( color = '#000' ) {

    imageCanvas.width = 1;
    imageCanvas.height = 1;

    imageContext.fillStyle = color;
    imageContext.fillRect( 0, 0, 1, 1 );

    return imageCanvas.toDataURL( 'image/jpeg' )

}


/** PDFImage
 *
 *	@ref https://blog.idrsolutions.com/2010/04/understanding-the-pdf-file-format-how-are-images-stored/
 *	
 *	@param {String} image
 *	@param {Number} width, height
 */
export default class PDFImage extends PDFXObject {
	
	constructor( image, width = 0, height = 0 ) {
		
		if( width == 0 && height == 0 ) {

			var istats = image_get_jpeg_stats( image );

			width = istats.width;
			height = istats.height;

		}

		super();

		this.Subtype = 'Image';
		this.Filter = 'DCTDecode';
		this.ColorSpace = 'DeviceRGB';
		this.BitsPerComponent = 8;

		this.Width = width;
		this.Height = height;

		this.stream = image;
		
	}
	
	/**
	 *
	 *	@param {Image | HTMLCanvasElement | String} image
	 */
	static From( image ) {

		var width = 0,
			height = 0;

		if( image instanceof HTMLElement ) {

			if( image instanceof HTMLCanvasElement ) {

				width = image.width;
				height = image.height;

				image = image.toDataURL( 'image/jpeg' );

			} else if( image instanceof HTMLImageElement || image instanceof Image ) {

				width = image.naturalWidth;
				height = image.naturalHeight;

				if( image.complete ) {

					image = image_get_jpeg_base64( image );

				} else {

					console.warn('PDFImage: @param \'image\' wasn\'t loaded', image);

					image = image_create_jpeg();

				}

			}

		}

		if( !(/data\:image\/jpeg/.test( image )) ) {

			console.warn('PDFImage: @param \'image\' isn\'t JPEG', image);

			image = image_create_jpeg();

		}

		image = image.replace( /data\:image\/jpeg;base64,/, '' );
		image = window.atob( image );

		return new PDFImage( image, width, height );

	}

}
