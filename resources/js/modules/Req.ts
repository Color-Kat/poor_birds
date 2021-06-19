import {merge} from 'lodash';
import {UrlType} from "./types/url";
import axios, {AxiosRequestConfig} from "axios";
import {resolve} from "chart.js/helpers";
type methods = 'get' | 'post';

export default class Req {
    private method: methods = 'get'; // request method
    private url: UrlType; // request method
    private config: AxiosRequestConfig = {}; // config for request

    constructor(method: methods, url: UrlType) {
        this.method = method;
        this.url = url;
    }

    /**
     * return bearer access token from localstorage
     * @return token - bearer authorization access token
     * */
    private get_access_token(): string {
        // return localStorage.getItem('access_token')
        //     ? localStorage.getItem('access_token')
        //     : '';

        return localStorage.getItem('access_token') ?? '';
    }

    /**
     * add user config to request
     * */
    public conf(conf: AxiosRequestConfig): Req {
        // merge old config and new config from params
        merge(this.config, conf);

        return this; // return self class
    }

    /**
     * add bearer authorization token to request
     * @return Req
     * */
    public auth(token: string): Req {
        // set value headers if it is null
        if (!this.config.headers) this.config.headers = {};
        // add authorization token to request config
        // this.config.headers.Authorization = `Bearer ${this.get_access_token()}`;
        this.config.headers.Authorization = `Bearer ${token}`;

        return this;// return self class
    }

    public send<T>(){
        if (this.method === 'get') {
            console.log(this);
            return axios.get<T>(
                this.url,
                this.config
            )
                .then(async response => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return false;
                });
        }
    }
}
