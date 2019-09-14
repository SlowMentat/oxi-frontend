
export function hextToBase64(data){
	let convertedData = String.fromCharCode.apply(null, data.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "));
	console.log("string from char code results");
	console.log(convertedData);
	return btoa(convertedData);
	//return btoa(data);
}

export function camelize(str){
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
		return index == 0 ? match.toLowerCase() : match.toUpperCase();
	})
}

/* 
*	Rounds value to the nearest specified step and trims result to the specified decimals
*/
export function roundTo(value, step=0.5, decimals=1){
    step || (step = 1.0);
    var inv = 1.0 / step;
    return (Math.round(value * inv) / inv).toFixed(decimals);
}