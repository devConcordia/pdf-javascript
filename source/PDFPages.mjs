
import PDFDictionary from "./core/PDFDictionary.mjs";
import PDFPage from "./PDFPage.mjs"

/** PDFPages
 *
 */
export default class PDFPages extends PDFDictionary {

	constructor() {

		super();

		this.Type = 'Pages';
		this.Kids = new Array();
		this.Count = 0;

	}

	/**	append
	 *
	 *	@param {PDFPage} 
	 */
	append() {

		for( var object of arguments ) {

			if( object instanceof PDFPage ) {

				this.Count = this.Kids.push( object );

				object.Parent = this;

			} else {

				console.warn( 'PDFPages.append: @param is\'t a PDFPage', object );

			}

		}

	}

}
