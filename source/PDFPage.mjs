
import PDFDictionary from "./core/PDFDictionary.mjs";
import PDFResources from "./PDFResources.mjs";

/** PDFPage
 *	
 *	
 */
export default class PDFPage extends PDFDictionary {
	
	constructor( w = 210, h = 297, x = 0, y = 0 ) {
		
		super();
		
		this.Type = 'Page';
		this.Parent = undefined;
		this.Contents = new Array();
		
		this.Annots = new Array();
		
	//	var viewport = [ x * MM, y * MM, w * MM, h * MM ];
		var viewport = [ x, y, w, h ];
		
		this.MediaBox = viewport;
		this.CropBox = viewport;
		this.TrimBox = viewport;
		
		// 
		
	}
	
	/**	append
	 *
	 *	@param (PDFStream) arguments
	 *		or (PDFAnnotation) arguments
	 */
	append() {
		
		for( var object of arguments ) {

			switch( object.constructor.name ) {
				
				case 'PDFStream':
						
						this.Contents.push( object );
						
						if( object.using ) this.use( ...Object.values( object.using ) );
						
					break;
				
				case 'PDFAnnot':
						
						this.Annots.push( object );
						
					break;
				
				default:
				
						console.warn( 'PDFPage.append: @param is\'t PDFStream or PDFAnnot', object );
				
					break;
				
			}
		
		}

	}
	
	/**	use
	 *
	 *	@param (PDFColorSpace) arguments
	 *		or (PDFImage) arguments
	 *		or (PDFState) arguments
	 *		or (PDFFont) arguments
	 */
	use() {

		if( !('Resources' in this) ) this.Resources = new PDFResources();
		
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
