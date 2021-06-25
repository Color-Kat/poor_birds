import {merge} from 'lodash';
import {UrlType} from "./types/url";
import ax, {AxiosRequestConfig, AxiosResponse} from "axios";
import {resolve} from "chart.js/helpers";

type methods = 'get' | 'post' | 'delete';

const axios            = ax;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// const axios = ax.create({baseURL: 'https://poorbirds.tk', timeout: 100000,});

interface IBird {
    care: number;
    demand: null;
    name: string;
}


export default class Req {
    readonly method: methods            = 'get'; // request method
    private url: UrlType; // request method
    private config: AxiosRequestConfig = {}; // config for request
    private isCatch: boolean = false; // if true return raw response

    private error: {
        message: string,
        show: boolean
    };

    constructor(method: methods, url: UrlType) {
        this.method = method;
        this.url    = url;
    }

    /**
     * return bearer access token from localstorage
     * @return token - bearer authorization access token
     * */
    private get_access_token(): string {
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
        if(!token) this.error = {
            message: 'no authorization token',
            show: false
        };

        // set value headers if it is null
        if (!this.config.headers) this.config.headers = {};
        // add authorization token to request config
        // this.config.headers.Authorization = `Bearer ${this.get_access_token()}`;
        this.config.headers.Authorization = `Bearer ${token}`;

        return this; // return self class
    }

    public catchMode(): Req {
        this.isCatch = true;
        return this;
    }

    public send<T>(data?: any): Promise<boolean | T> {
        // errors
        if(this.error){
            return new Promise((resolve, reject) => {
                if (this.error.show) console.error(this.error);
                resolve(false);
            });
        }

        if (this.method === 'get' || this.method === 'delete') {
            // send request get | delete
            return axios[this.method]<T>(
                this.url,
                this.config
            )
                .then(response => {
                    if(this.isCatch) return !response;

                    // check request status
                    if (
                        response.status === 200 ||
                        response.status === 201 ||
                        response.status === 202
                    )
                        return response.data; // success
                    else {
                        console.log(response);
                        return false; // some error
                    }
                })
                .catch((error) => {
                    // return raw response
                    if(this.isCatch) return !error;

                    // show error
                    console.log(error);
                    if (error.response) console.log(error.response);

                    return false;
                });
        }
        else if (this.method === 'post') {
            return axios.post<T>(
                this.url,
                data,
                this.config
            )
                .then(response => {
                    // check request status
                    if (
                        response.status === 200 ||
                        response.status === 201
                    )
                        return response.data; // success
                    else {
                        console.log(response);
                        return false; // some error
                    }
                })
                .catch((error) => {
                    // show error
                    console.log(error);
                    if (error.response) console.log(error.response);

                    return false;
                });
        }
    }
}
