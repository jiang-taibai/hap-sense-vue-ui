import axios from "axios";

export class ApiBuilder {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.setup()
    }

    setup() {
        const http = axios.create({
            baseURL: this.baseURL,
            withCredentials: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                let newData = '';
                for (let k in data) {
                    if (data.hasOwnProperty(k) === true) {
                        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
                    }
                }
                return newData;
            }]
        });
        const apiAxios = (method, url, params, response_on_success, response_on_error) => {
            if (params instanceof Function) {
                throw new Error('又把参数省略了，你在干什么？是不是又要花几小时找错误了。 T_T');
            }
            http({
                method: method,
                url: url,
                data: method === 'POST' || method === 'PUT' ? params : null,
                params: method === 'GET' || method === 'DELETE' ? params : null,
            }).then(function (res) {
                response_on_success(res);
            }).catch(function (err) {
                response_on_error(err);
            })
        }

        this.get = (url, params, response_on_success, response_on_error) => apiAxios('GET', url, params, response_on_success, response_on_error)
        this.post = (url, params, response_on_success, response_on_error) => apiAxios('POST', url, params, response_on_success, response_on_error)
        this.put = (url, params, response_on_success, response_on_error) => apiAxios('PUT', url, params, response_on_success, response_on_error)
        this.delete = (url, params, response_on_success, response_on_error) => apiAxios('DELETE', url, params, response_on_success, response_on_error)
    }

}