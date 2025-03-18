
import PDFStream from "./core/PDFStream.mjs";

/** PDFXObject
 *
 */
export default class PDFXObject extends PDFStream {
	
	constructor() {
		
		super();
		
		this.Type = 'XObject';
		this.Name = this.getObjectName();
		
	}
	
}
