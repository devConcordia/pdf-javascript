
import PDFDictionary from "./core/PDFDictionary.mjs";
import PDFString from "./core/PDFString.mjs";

/**	PDFAction
 *
 *	Table 198 - Subtype
 *		Launch		Launch an application, usually to open a file.
 *		Thread		Begin reading an article thread.
 *		URI			Resolve a uniform resource identifier.
 *		Sound		(PDF 1.2) Play a sound.
 *		Movie		(PDF 1.2) Play a movie.
 *		Hide		(PDF 1.2) Set an annotation’s Hidden flag.
 *		Named		(PDF 1.2) Execute an action predefined by the conforming reader.
 *		SubmitForm	(PDF 1.2) Send data to a uniform resource locator.
 *		ResetForm	(PDF 1.2) Set fields to their default values.
 *		ImportData	(PDF 1.2) Import field values from a file.
 *		JavaScript	(PDF 1.3) Execute a JavaScript script.
 *		SetOCGState	(PDF 1.5) Set the states of optional content groups.
 *		Rendition	(PDF 1.5) Controls the playing of multimedia content.
 *		Trans		(PDF 1.5) Updates the display of a document, using a transition dictionary.
 *		GoTo3DView	(PDF 1.6) Set the current view of a 3D annotation
 *	
 */
export default class PDFAction extends PDFDictionary {

    /** constructor
     *
     * 	@param {String} data
     *	@param {String} subtype
     */
	constructor( data, subtype ) {

		super();

		this.Type = 'Action';
		this.S = subtype;

		switch( subtype ) {

			case PDFAction.JS:

					this.JS = '<' + PDFString.HexadecimalEncode( data ) + '>';

				break;

			case PDFAction.URI:

					this.URI = '('+ data +')';

				break;
		}

	}

	static URI = 'URI';

	static JS = 'JavaScript';

}
