export namespace main {
	
	export class CreateCollectionRequest {
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateCollectionRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	    }
	}
	export class HttpRequest {
	    url: string;
	    method: string;
	
	    static createFrom(source: any = {}) {
	        return new HttpRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.method = source["method"];
	    }
	}

}

