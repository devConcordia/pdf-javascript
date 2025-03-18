
import { SP, getUID } from "./common.mjs";

/** 
 *	
 *	
 *	
 *	@param {*} primitive	Number | Boolean | String | Array | Object
 */
export default function PDFObject( primitive ) {
	
	return class PDFObject extends primitive {
		
		#name = null;
		#objectNumber = 0;
		#generationNumber = 0;
	
		constructor() {
			
			super( ...arguments );
			
			this.#name = getUID( this.constructor.name );
			
		}
		
		getObjectHeader() {
			
			return this.#objectNumber + SP + this.#generationNumber + SP + 'obj'

		}

		getObjectName() {
			
			return this.#name

		}
		
		getObjectR() {
			
			return this.#objectNumber + SP + this.#generationNumber + SP + 'R'

		}
		
		setObjectR( objectNumber, generationNumber = 0 ) {
			
			this.#objectNumber = objectNumber;
			this.#generationNumber = generationNumber;
			
		}
	
	}
	
}
