

//function that manufactures action creators for making modifications to entites
//entityTarget:  	parameter that tells reducer logic on which store slice to operate.  
//					This is needed so that common reducer logic can be reused across entity related actions 
export function makeActionCreator(type, entityTarget, ...dataKeys){
	return function(...dataValues){
		const action = {type: type, typeSpecifier: entityTarget, payload : {}};
		dataKeys.forEach((dataKey, index) => {
			action.payload[dataKey] = dataValues[index] 
		}) 
      	return action;
    };
}

export function makePromiseActionCreator(type, entityTarget, promise, ...dataKeys){
	return function(...dataValues){
		const action = {type: type, meta:{typeSpecifier: entityTarget}, payload: promise};
		dataKeys.forEach((dataKey, index) => {
			action.meta[dataKey] = dataValues[index] 
		}) 
      	return action;
	}
}