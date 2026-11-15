
import PDFDictionary from "./core/PDFDictionary.mjs";
import PDFColorSpace from "./PDFColorSpace.mjs";
import PDFImage from "./PDFImage.mjs";
import PDFExtGState from "./PDFExtGState.mjs";
import PDFFont from "./PDFFont.mjs";

/** PDFResources
 *
 */
export default class PDFResources extends PDFDictionary {

	/**	add
	 *
	 *	@param {PDFColorSpace|PDFImage|PDFState|PDFFont}
	 */
	add() {

		for (const object of arguments) {

			const name = object.getObjectName();

			if (object instanceof PDFColorSpace) {

				if( !('ColorSpace' in this) )
					this.ColorSpace = new Object;

				this.ColorSpace[ name ] = object;

			}
			else if (object instanceof PDFImage) {

				if( !('XObject' in this) )
					this.XObject = new Object;

				this.XObject[ name ] = object;

			}
			else if (object instanceof PDFExtGState) {

				if( !('ExtGState' in this) )
					this.ExtGState = new Object;

				this.ExtGState[ name ] = object;

			}
			else if (object instanceof PDFFont) {

				if( !('Font' in this) )
					this.Font = new Object;

				this.Font[ name ] = object;

			}
			else
			{
				console.warn( `PDFResources.add: @param ${object.constructor.name} can't add to resources`, object );
			}

		}

	}

}
