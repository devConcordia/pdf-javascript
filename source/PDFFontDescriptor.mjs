
import PDFDictionary from "./core/PDFDictionary.mjs";



/** PDFFontDescriptor
 *	
 *	
 *	9.8.2 Font Descriptor Flags (p. 291)
 *	
 *		1 	FixedPitch 		All glyphs have the same width (as opposed to proportional or
 *	    					variable-pitch fonts, which have different widths).
 *	    2 	Serif 			Glyphs have serifs, which are short strokes drawn at an angle on the
 *	    					top and bottom of glyph stems. (Sans serif fonts do not have serifs.)
 *	    3 	Symbolic 		Font contains glyphs outside the Adobe standard Latin character set.
 *	    					This flag and the Nonsymbolic flag shall not both be set or both be clear.
 *	    4 	Script 			Glyphs resemble cursive handwriting.
 *	    6 	Nonsymbolic 	Font uses the Adobe standard Latin character set or a subset of it.
 *	    7 	Italic 			Glyphs have dominant vertical strokes that are slanted.
 *	    17 	AllCap 			Font contains no lowercase letters; typically used for display purposes,
 *	    					such as for titles or headlines. 
 *		18 	SmallCap 		Font contains both uppercase and lowercase letters. The uppercase
 *							letters are similar to those in the regular version of the same typeface
 *	    					family. The glyphs for the lowercase letters have the same shapes as
 *	    					the corresponding uppercase letters, but they are sized and their
 *	    					proportions adjusted so that they have the same size and stroke
 *	    					weight as lowercase glyphs in the same typeface family.
 *	    19 	ForceBold 		See description after Note 1 in this sub-clause. 
 *	
 *	
 *	
 *	
 *	Table 126 – Embedded font organization for various font types
 *
 *	+-----------+---------------+---------------------------------------------------+
 *	| Key       | Subtype       | Description                                       |
 *	+-----------+---------------+---------------------------------------------------+
 *	| FontFile  |               | Type 1 font program, in the original (noncompact) |
 *	|           |               | format described in Adobe Type 1 Font Format.     |
 *	|           |               | This entry may appear in the font descriptor for  |
 *	|           |               | a Type1 or MMType1 font dictionary.               |
 *	+-----------+---------------+---------------------------------------------------+
 *	| FontFile2 |               | This entry may appear in the font descriptor for  |
 *	|           |               | a TrueType font dictionary or (PDF 1.3) for a     |
 *	|           |               | CIDFontType2 CIDFont dictionary.                  |
 *	+-----------+---------------+---------------------------------------------------+
 *	| FontFile3 | Type1C        | Type 1–equivalent font program represented in the |
 *	|           |               | Compact Font Format (CFF), as described in Adobe  |
 *	|           |               | Technical Note #5176, The Compact Font Format     |
 *	|           |               | Specification. This entry may appear in the font  |
 *	|           |               | descriptor for a Type1 or MMType1 font dictionary |
 *	+-----------+---------------+---------------------------------------------------+
 *	| FontFile3 | CIDFontType0C | Type 0 CIDFont program represented in the Compact |
 *	|           |               | Font Format (CFF), as described in Adobe          |
 *	|           |               | Technical Note #5176, The Compact Font Format     |
 *	|           |               | Specification. This entry may appear in the font  |
 *	|           |               | descriptor for a CIDFontType0 CIDFont dictionary. |
 *	+-----------+---------------+---------------------------------------------------+
 *	| FontFile3 | OpenType      | Described in the OpenType Specification v.1.4     |
 *	|           |               | OpenType is an extension of TrueType that allows  |
 *	|           |               | inclusion of font programs that use the Compact   |
 *	|           |               | Font Format (CFF).                                |
 *	+-----------+---------------+---------------------------------------------------+
 *	
 *	
 */
export default class PDFFontDescriptor extends PDFDictionary {
	
	/** constructor
	 *	
	 *	@param {String} base
	 *	@param {String} subtype
	 *	@param {String} encode
	 */
	constructor() {
		
		super();
		
		this.Type = 'FontDescriptor';
		
		/// The PostScript name of the font. This name shall be the
		/// same as the value of BaseFont in the font or CIDFont dictionary that
		/// refers to this font descriptor.
		this.FontName = '';
		
		/// A byte string specifying the preferred font family name.
	//	this.FontFamily = '';
		
		/// Optional; PDF 1.5; should be used for Type 3 fonts in Tagged PDF documents
		/// The font stretch value. It shall be one of these names
		/// UltraCondensed, ExtraCondensed, Condensed, SemiCondensed, Normal,
		/// SemiExpanded, Expanded, ExtraExpanded or UltraExpanded. 
	//	this.FontStretch = 'Normal';
		
		/// Optional; PDF 1.5; should be used for Type 3 fonts in Tagged PDF documents
		/// The weight (thickness) component of the fully-qualified
		/// font name or font specifier. The possible values shall be 100, 200, 300,
		/// 400, 500, 600, 700, 800, or 900, where each number indicates a
		/// weight that is at least as dark as its predecessor. A value of 400 shall
		/// indicate a normal weight; 700 shall indicate bold.
	//	this.FontWeight = 400;
		
		/// Required
		///  A collection of flags defining various characteristics of the font (see 9.8.2, "Font Descriptor Flags").
		this.Flags = 2;
		
		/// Required, except for Type 3 fonts
		/// A rectangle (see 7.9.5,"Rectangles"), expressed in the glyph 
		/// coordinate system, that shall specify the font bounding box. 
		this.FontBBox = [0, 0, 1000, 1000];
		
		/// Required
		/// The angle, expressed in degrees counterclockwise from
		/// the vertical, of the dominant vertical strokes of the font.
		this.ItalicAngle = 0;
		
		/// Required, except for Type 3 fonts
		/// The maximum height above the baseline reached by glyphs in this font. 
		/// The height of glyphs for accented characters shall be excluded.
		this.Ascent = 700;
		
		/// Required, except for Type 3 fonts
		/// The maximum depth below the baseline reached by glyphs in this font. 
		/// The value shall be a negative number.
		this.Descent = -10;
		
		/// The spacing between baselines of consecutive lines of text.
	//	this.Leading = 0;
		
		/// Required for fonts that have Latin characters, except for Type 3 fonts
		/// The vertical coordinate of the top of flat capital letters, 
		/// measured from the baseline.
		this.CapHeight = 0;
		
		/// The font’s x height: the vertical coordinate of the top of flat
		/// nonascending lowercase letters (like the letter x), measured from the
		/// baseline, in fonts that have Latin characters.
	//	this.XHeight = 0;
		
		/// Required, except for Type 3 fonts
		/// The thickness, measured horizontally, of the dominant vertical stems of glyphs in the font.
		this.StemV = 100;

		/// Optional
		/// The thickness, measured vertically, of the dominant horizontal stems of glyphs in the font. 
	//	this.StemH = 0;

		/// (Optional) The average width of glyphs in the font. Default value: 0.
	//	this.AvgWidth = 0; 

		/// (Optional) The maximum width of glyphs in the font. Default value: 0.
	//	this.MaxWidth = 0; 

		/// (Optional) The width to use for character codes whose widths are not
		/// specified in a font dictionary’s Widths array. This shall have a
		/// predictable effect only if all such codes map to glyphs whose actual
		/// widths are the same as the value of the MissingWidth entry
	//	this.MissingWidth = 0; 

		/// (Optional) A stream containing a Type 1 font program (see 9.9, "Embedded Font Programs").
	//	this.FontFile = null;

		/// (Optional; PDF 1.1) A stream containing a TrueType font program (see 9.9, "Embedded Font Programs").
	//	this.FontFile2 = null;

		/// (Optional; PDF 1.2) A stream containing a font program whose format
		/// is specified by the Subtype entry in the stream dictionary (see Table 126).
	//	this.FontFile3 = null;
		
		/// (Optional; meaningful only in Type 1 fonts; PDF 1.1) A string listing the
		/// character names defined in a font subset. The names in this string
		/// shall be in PDF syntax—that is, each name preceded by a slash (/).
	//	this.CharSet = '(/)';

	}
	
}



 



