"use strict";

export class Request{
    constructor(base_url, query=null, limit=100){
        this.base_url = base_url;
        this.query = query;
        this.limit = limit;
    }

    build_url(){
        if (this.query === null) {
            return this.base_url;
        }
        const limit_param = `limit=${this.limit}`;
        const query_param = `q=${this.query}`;
        return `${this.base_url}?${limit_param}&${query_param}`;
    }

    async send(){
        const url = this.build_url();
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }
}