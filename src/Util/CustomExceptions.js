

export function RequestFailedException (failedRequests){
	
	this.failedRequests = failedRequests.map(failedReq => ({
		status: failedReq.status,
		fullURL:  failedReq.request.baseURL + failedReq.request.url,
		requestData: failedReq.request.data,
	}));

	this.name = 'BatchRequestException';
}