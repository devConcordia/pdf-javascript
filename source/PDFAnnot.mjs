
import PDFDictionary from "./core/PDFDictionary.mjs";

/** PDFAnnot
 *	
 *	Subtypes:
 *
 *		Text			Caret				Underline
 *		Link            Ink                 Squiggly 
 *		FreeText        Popup               StrikeOut
 *		Line            FileAttachment      Stamp
 *		Square          Sound				TrapNet
 *		Circle          Movie               Watermark
 *		Polygon         Widget              3D
 *		PolyLine        Screen              Redact
 *		Highlight       PrinterMark
 *	
 *	@param (PDFAction) action
 *	@param (String) subtype
 *	@param (Number) x, y, w, h
 */
export default class PDFAnnot extends PDFDictionary {

	static LINK = 'Link';
	
	constructor( action, subtype, x, y, w, h ) {
		
		super();
		
		this.Type = 'Annot';
		
		this.Rect = [ x, y, (x + w), (y + h) ];
		
		this.Border = [ 0, 0, 0 ];
		
		this.A = action;
		
		this.Subtype = subtype;
		
	}
	
}
