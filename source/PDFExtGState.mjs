
import PDFDictionary from "./core/PDFDictionary.mjs";

/** PDFState
 *
 */
export default class PDFExtGState extends PDFDictionary {
	
	constructor() {
		
		super();
		
		this.Type = 'ExtGState';
		
	}
	
}
