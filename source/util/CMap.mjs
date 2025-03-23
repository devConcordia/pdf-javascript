

/** CMap
 *	
 *	9.7.6.2 CMap Mapping (p. 288)
 *	
 *	
 *	A sequence of one or more bytes shall be extracted from the string and matched against the codespace ranges
 *	in the CMap. That is, the first byte shall be matched against 1-byte codespace ranges; if no match is found, a
 *	second byte shall be extracted, and the 2-byte code shall be matched against 2-byte codespace ranges. This
 *	process continues for successively longer codes until a match is found or all codespace ranges have been
 *	tested. There will be at most one match because codespace ranges shall not overlap. 
 *
 *
 *
 *	The code extracted from the string shall be looked up in the
 *	character code mappings for codes of that length (These are
 * 	the mappings defined by beginbfchar, endbfchar, begincidchar, 
 *	endcidchar, and corresponding operators for ranges.).
 *	Failing that, it shall be looked up in the notdef mappings, 
 *	as described in the next subclause. 
 *	
 *	The beginbfchar and endbfchar shall not appear in a CMap 
 *	that is used as the Encoding entry of a Type 0 font; 
 *	however, they may appear in the definition of a ToUnicode CMap.
 *	
 *	
 */
export default class CMap {
	
	/** 
	 *	
	 *	beginbfchar, endbfchar, 
	 *	begincidchar, endcidchar
	 *	
	 *	
	 */
	constructor( input ) {
		
		this.range = getRanges( input );
		
		this.unicodes = getTables( input );
		
	}
	
	decode( input ) {
		
		let output = [];
		
		for( let code of input ) {
			
			output.push( this.unicodes.get( code ) );
			
		}
		
		return output;
		
	}
	
	encode( input ) {
		
		throw new Error("CMap.encode: not impletede yet");
		
	/*	let output = [];
		
		for( let code in input ) {
			
			output.push( this.unicodes.get( code ) );
			
		}
		
		return output;
	/**/
	
	}
	
}

/*
function fromHex( input ) {
	
	return input.split(' ').map(function() {
		return parseInt( e.replace(/[\<\>]/, ''), 16 );
	});
	
}
/**/

//	1 begincodespacerange
//	<00> <FF>
//	endcodespacerange
	
//	4 begincodespacerange
//	<00> <80>
//	<8140> <9FFC>
//	<A0> <DF>
//	<E040> <FCFC>
//	endcodespacerange
	
function getRanges( input ) {
	
	let output = new Map();
	
	let i = 0;
	
	while( i < input.length ) {
		
		let a = input.indexOf('begincodespacerange', i);
		
		if( a == -1 ) break;
		
		let b = input.indexOf('endcodespacerange', a);
		
		if( b == -1 ) break;
		
		let lines = input.substring( a, b ).split('\n');
		
		for( let line of lines ) {
			
			let [ code, value ] = line.split(/\s/).map(function(e) {
				return parseInt( e.replace(/[\<\>]/, ''), 16 );
			});
			
			output.set( code, value );
			
		}
		
		i = b + 18;
		
	}
	
	return output;
	
}


// 88 beginbfchar
// <01> <0020>
// <02> <0043>
// ...
// <56> <0028>
// <57> <0029>
// <58> <00C0>
// endbfchar


/// 100 begincidrange
/// <20> <7D> 231
/// ...
/// <81C8> <81CE> 749
/// ...
/// <FB40> <FB7E> 8518
/// <FB80> <FBFC> 8581
/// <FC40> <FC4B> 8706
/// endcidrange

function getTables( input ) {
	
	let output = new Map();
	
	let i = 0;
	
	while( i < input.length ) {
		
		let a = input.indexOf('beginbfchar', i);
		
		if( a == -1 ) break;
		
		let b = input.indexOf('endbfchar', a);
		
		if( b == -1 ) break;
		
		let lines = input.substring( a, b ).split('\n');
		
		for( let line of lines ) {
			
			let [ code, value ] = line.split(/\s/).map(function(e) {
				return parseInt( e.replace(/[\<\>]/, ''), 16 );
			});
			
			output.set( code, value );
			
		}
		
		
		i = b + 18;
		
	}
	
	i = 0;
	
	while( i < input.length ) {
		
		let a = input.indexOf('begincidchar', i);
		
		if( a == -1 ) break;
		
		let b = input.indexOf('endcidchar', a);
		
		if( b == -1 ) break;
		
		let lines = input.substring( a, b ).split('\n');
		
		for( let line of lines ) {
			
			let [ code, value, id ] = line.split(/\s/).map(function(e) {
				
				if( e.charAt(0) == '<' ) {
					
					return parseInt( e.replace(/[\<\>]/, ''), 16 );
					
				} else {
					
					return parseInt( e );
					
				}
				
			});
			
			output.set( code, value );
			
		}
		
		i = b + 18;
		
	}
	
	return output;
	
}



/* 

/CIDInit/ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo<<
/Registry (Adobe)
/Ordering (UCS)
/Supplement 0
>> def
/CMapName/Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<00> <FF>
endcodespacerange
88 beginbfchar
<01> <0020>
<02> <0043>
<03> <0061>
<04> <0073>
<05> <0056>
<06> <0065>
<07> <006C>
<08> <0068>
<09> <0054>
<0A> <0078>
<0B> <0074>
<0C> <006F>
<0D> <002D>
<0E> <0066>
<0F> <006E>
<10> <003A>
<11> <004F>
<12> <0062>
<13> <0072>
<14> <006D>
<15> <0070>
<16> <002C>
<17> <004D>
<18> <0063>
<19> <0064>
<1A> <0041>
<1B> <0069>
<1C> <0076>
<1D> <002E>
<1E> <0049>
<1F> <004E>
<20> <0067>
<21> <0075>
<22> <0052>
<23> <004A>
<24> <0031>
<25> <0039>
<26> <0034>
<27> <0050>
<28> <0045>
<29> <00E7>
<2A> <00E3>
<2B> <0035>
<2C> <002F>
<2D> <0030>
<2E> <0038>
<2F> <0032>
<30> <0036>
<31> <00CD>
<32> <0055>
<33> <004C>
<34> <0053>
<35> <0044>
<36> <0071>
<37> <00E1>
<38> <00F4>
<39> <2014>
<3A> <006A>
<3B> <00EA>
<3C> <0033>
<3D> <00ED>
<3E> <00F3>
<3F> <00E9>
<40> <00F5>
<41> <00FA>
<42> <0047>
<43> <007A>
<44> <0046>
<45> <003B>
<46> <003F>
<47> <00C9>
<48> <00660069>
<49> <00E0>
<4A> <00E2>
<4B> <00FC>
<4C> <0051>
<4D> <00AA>
<4E> <0066006C>
<4F> <0037>
<50> <0021>
<51> <0022>
<52> <0048>
<53> <0042>
<54> <0058>
<55> <2019>
<56> <0028>
<57> <0029>
<58> <00C0>
endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
end

*/