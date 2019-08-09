export default class Resource {

    constructor(axios) {
        this.axios = axios;
    }

    get(path = "/", params, headers = {}) {
        return this.promise(
            this.axios.get(this.name + path, {params, headers})
        );
    }

    post(path = "/", params, headers = {}) {
        return this.promise(
            this.axios.post(this.name + path, params, {headers})
        );
    }

    put(path = "/", params, headers = {}) {
        return this.promise(
            this.axios.put(this.name + path, params, {headers})
        );
    }

    patch(path = "/", params, headers = {}) {
        return this.promise(
            this.axios.patch(this.name + path, params, {headers})
        );
    }

    models(array) {
        return array.map(model => this.model(model));
    }

    model(model) {
        return model;
    }

    promise(request) {
        return new Promise((resolve, reject) => {

            request.then(response => {

                if (response) {
                    if (response.data.success) {
                        resolve(response.data.data);
                    }
                }
            }).catch(error => {
                if(error.response){
                    reject(error.response.data.errors);
                }else{
                    reject(error);
                }
            });

        })
    }

}
