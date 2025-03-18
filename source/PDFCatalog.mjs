
import PDFDictionary from "./core/PDFDictionary.mjs";

/** Catalog
 *
 */
export default class PDFCatalog extends PDFDictionary {
	
	constructor() {
		
		super();
		
		this.Type = 'Catalog';
		this.Pages = undefined;
		
	}
	
}
