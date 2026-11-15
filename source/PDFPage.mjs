
import PDFDictionary from "./core/PDFDictionary.mjs";
import PDFResources from "./PDFResources.mjs";
import PDFStream from "./core/PDFStream.mjs";
import PDFAnnot from "./PDFAnnot.mjs";

/** PDFPage
 *
 */
export default class PDFPage extends PDFDictionary {

	constructor( w = 210, h = 297, x = 0, y = 0 ) {

		super();

		this.Type = 'Page';
		this.Parent = undefined;
		this.Contents = new Array();

		this.Annots = new Array();

		var viewport = [ x, y, w, h ];

		this.MediaBox = viewport;
		this.CropBox = viewport;
		this.TrimBox = viewport;

		//

	}

	/**	append
	 *
	 *	@param {PDFStream|PDFAnnotation}
	 */
	append() {

		for (const object of arguments) {

			if (object instanceof PDFStream) {

				this.Contents.push( object );

				if( object.using )
					this.use( ...Object.values( object.using ) );

			}
			else if (object instanceof PDFAnnot) {

				this.Annots.push( object );

			}
			else {

				console.warn( 'PDFPage.append: @param is\'t PDFStream or PDFAnnot', object );

			}

		}

	}

	/**	use
	 *
	 *	@param {PDFColorSpace|PDFImage|PDFState|PDFFont}
	 */
	use() {

		if( !('Resources' in this) )
			this.Resources = new PDFResources();

		this.Resources.add( ...arguments );

	}

	/** setViewport
	 *
	 */
	setViewport( w, h, x = 0, y = 0 ) {

		var viewport = [ x, y, w, h ];

		this.MediaBox = viewport;
		this.CropBox = viewport;
		this.TrimBox = viewport;

	}

}
