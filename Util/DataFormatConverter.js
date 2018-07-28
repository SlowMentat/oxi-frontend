
export function hextToBase64(data){
	let convertedData = String.fromCharCode.apply(null, data.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "));
	console.log("string from char code results");
	console.log(convertedData);
	return btoa(convertedData);
	//return btoa(data);
}