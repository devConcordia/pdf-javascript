
import PDFDictionary from "./core/PDFDictionary.mjs";

/** PDFResources
 *	
 */
export default class PDFResources extends PDFDictionary {
	
	/**	add
	 *
	 *	@param (PDFColorSpace) arguments
	 *		or (PDFImage) arguments
	 *		or (PDFState) arguments
	 *		or (PDFFont) arguments
	 */
	add() {
		
		for( var object of arguments ) {

			var name = object.getObjectName();
				
			switch( object.constructor.name ) {
				
				case 'PDFColorSpace':
						
						if( !('ColorSpace' in this) )
							this.ColorSpace = new Object;
						
						this.ColorSpace[ name ] = object;
					
					break;
				
				case 'PDFImage':
				
						if( !('XObject' in this) )
							this.XObject = new Object;
						
						this.XObject[ name ] = object;
				
					break;
				
				case 'PDFExtGState':
					
						if( !('ExtGState' in this) )
							this.ExtGState = new Object;
						
						this.ExtGState[ name ] = object;
					
					break;
				
				case 'PDFFont':
				
						if( !('Font' in this) )
							this.Font = new Object;
						
						this.Font[ name ] = object;
						
					break;
				
				default: 
						console.log( object )
						throw 'PDFResources.add: @param can\'t add to resources';
					break;
				
			}

		}
		
	}
	
}
