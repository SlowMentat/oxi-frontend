import { useRef, useEffect } from 'react';
import { OxiAppConstants } from './OxiAppConstants.js';

export function hextToBase64(data){
	let convertedData = String.fromCharCode.apply(null, data.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "));
	console.log("string from char code results");
	console.log(convertedData);
	return btoa(convertedData);
	//return btoa(data);
}

export function camelize(str){
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
		return index == 0 ? match.toLowerCase() : match.toUpperCase().trim();
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



/**
 * Convert array-like or iterable object to an array.
 * @param {*} value - The value to convert.
 * @returns {Array} Returns a new array.
 */
export function toArray(value) {
  return Array.from ? Array.from(value) : slice.call(value);
}

/**
 * Transform array buffer to Data URL.
 * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
 * @param {string} mimeType - The mime type of the Data URL.
 * @returns {string} The result Data URL.
 */
export function arrayBufferToDataURL(arrayBuffer, mimeType) {
  const chunks = [];

  // Chunk Typed Array for better performance (#435)
  const chunkSize = 8192;
  let uint8 = new Uint8Array(arrayBuffer);

  while (uint8.length > 0) {
    // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
    // eslint-disable-next-line prefer-spread
    chunks.push(String.fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
    //chunks.push(String.fromCharCode.apply(null,  new Uint8Array(chunkSize)) );
    uint8 = uint8.subarray(chunkSize);
  }

  return `data:${mimeType};base64,${btoa(chunks.join(''))}`;
}


/*
* The ongoingTouchIndexById() function below scans through the ongoingTouches array to 
* find the touch matching the given identifier, then returns that touch's index into the array.
*/
export function ongoingTouchIndexById(idToFind, ongoingTouches){
  for(let i = 0; i < ongoingTouches.length; i++){
    var id = ongoingTouches[i].identifier;
    if(id == idToFind){
      return i;
    }
  }
  return -1; //not found
}

/*
* Some browsers (mobile Safari, for one) re-use touch objects between events, 
* so it's best to copy the bits you care about, rather than referencing the entire object.
*/
export function copyTouch(touch){
  return {
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
  }
}


export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function mapImageUri(uri){
  var mappedUri = '';
  var prefix = uri.slice(0, 3);
  switch(prefix){
    case "ogl":
      mappedUri = `/images/original/${uri}`;
      break;

    case "sml":
      mappedUri = `/images/small/${uri}`;
      break;

    case "med":
      mappedUri = `/images/medium/${uri}`;
      break;

    case "lrg":
      mappedUri = `/images/large/${uri}`;
      break;

    case "tnl":
      mappedUri = `/images/thumbnail/${uri}`;
      break;
      
    default:
      break;
  }

  return mappedUri;
}

export function getImageURL(filename, size){
  let url = 'https://www.oxisalechannel.com/images';
  const filenameMatch = filename.match(/^[A-Za-z0-9]{3}/);
  const prefix = filenameMatch ? filenameMatch[0] : '';

  const {
    thumbnail,
    small,
    medium,
    large,
    original,
  } = OxiAppConstants.prefixes;
  
  if(filename){
    switch(prefix){
      case thumbnail:
        return(`${url}/thumbnail/${filename}.jpg`);
        break;

      case small:
        return(`${url}/small/${filename}.jpg`);
        break;

      case medium:
        return(`${url}/medium/${filename}.jpg`);
        break;

      case large:
        return(`${url}/large/${filename}.jpg`);
        break;

      case original:
        return(`${url}/original/${filename}.jpg`);
        break;

      default:
        break;
    }
  }
  else{

  }
}

export function isDataURL(s) {
  const regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
  return !!s.match(regex);
}

