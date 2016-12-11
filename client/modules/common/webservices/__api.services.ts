/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace common.webservices {
    export interface IPetClient {
        addPet(body: common.webservices.models.Pet): angular.IPromise<string>;
        updatePet(body: common.webservices.models.Pet): angular.IPromise<string>;
        findPetsByStatus(status: string[]): angular.IPromise<common.webservices.models.Pet[]>;
        findPetsByTags(tags: string[]): angular.IPromise<common.webservices.models.Pet[]>;
        getPetById(petId: number): angular.IPromise<common.webservices.models.Pet>;
        updatePetWithForm(petId: number, name?: string, status?: string): angular.IPromise<string>;
        deletePet(petId: number, api_key?: string): angular.IPromise<string>;
        uploadFile(petId: number, additionalMetadata?: string, file?: any): angular.IPromise<common.webservices.models.ApiResponse>;
    }
    export interface IStoreClient {
        getInventory(): angular.IPromise<any>;
        placeOrder(body: common.webservices.models.Order): angular.IPromise<common.webservices.models.Order>;
        getOrderById(orderId: number): angular.IPromise<common.webservices.models.Order>;
        deleteOrder(orderId: number): angular.IPromise<string>;
    }
    export interface IUserClient {
        createUser(body: common.webservices.models.User): angular.IPromise<string>;
        createUsersWithArrayInput(body: common.webservices.models.User[]): angular.IPromise<string>;
        createUsersWithListInput(body: common.webservices.models.User[]): angular.IPromise<string>;
        loginUser(username: string, password: string): angular.IPromise<string>;
        logoutUser(): angular.IPromise<string>;
        getUserByName(username: string): angular.IPromise<common.webservices.models.User>;
        updateUser(username: string, body: common.webservices.models.User): angular.IPromise<string>;
        deleteUser(username: string): angular.IPromise<string>;
    }
}
namespace common.webservices {
    export class PetClient implements common.webservices.IPetClient {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: app.IConfig) {
        }
        public addPet(body: common.webservices.models.Pet): angular.IPromise<string> {
            let resourceUrl: string = '/pet';
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'POST',
                        data: body,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public updatePet(body: common.webservices.models.Pet): angular.IPromise<string> {
            let resourceUrl: string = '/pet';
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'PUT',
                        data: body,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public findPetsByStatus(status: string[]): angular.IPromise<common.webservices.models.Pet[]> {
            let resourceUrl: string = '/pet/findByStatus';
            let queryParams: any = {
                 status: status
            };
            return new this.$q<common.webservices.models.Pet[]>(
                (resolve: angular.IQResolveReject<common.webservices.models.Pet[]>, reject: angular.IQResolveReject<any>) => {
                    this.$http<common.webservices.models.Pet[]>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: common.webservices.models.Pet[]) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public findPetsByTags(tags: string[]): angular.IPromise<common.webservices.models.Pet[]> {
            let resourceUrl: string = '/pet/findByTags';
            let queryParams: any = {
                 tags: tags
            };
            return new this.$q<common.webservices.models.Pet[]>(
                (resolve: angular.IQResolveReject<common.webservices.models.Pet[]>, reject: angular.IQResolveReject<any>) => {
                    this.$http<common.webservices.models.Pet[]>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: common.webservices.models.Pet[]) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public getPetById(petId: number): angular.IPromise<common.webservices.models.Pet> {
            let resourceUrl: string = '/pet/{petId}'.replace('{petId}', petId.toString());
            let queryParams: any = {
            };
            return new this.$q<common.webservices.models.Pet>(
                (resolve: angular.IQResolveReject<common.webservices.models.Pet>, reject: angular.IQResolveReject<any>) => {
                    this.$http<common.webservices.models.Pet>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: common.webservices.models.Pet) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public updatePetWithForm(petId: number, name?: string, status?: string): angular.IPromise<string> {
            let resourceUrl: string = '/pet/{petId}'.replace('{petId}', petId.toString());
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    let fd: FormData = new FormData();
                    fd.append('name', name);
                    fd.append('status', status);
                    this.$http<string>( {
                        method: 'POST',
                        data: fd,
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        },
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public deletePet(petId: number, api_key?: string): angular.IPromise<string> {
            let resourceUrl: string = '/pet/{petId}'.replace('{petId}', petId.toString());
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'DELETE',
                        headers: {
                            'api_key': api_key
                        },
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public uploadFile(petId: number, additionalMetadata?: string, file?: any): angular.IPromise<common.webservices.models.ApiResponse> {
            let resourceUrl: string = '/pet/{petId}/uploadImage'.replace('{petId}', petId.toString());
            let queryParams: any = {
            };
            return new this.$q<common.webservices.models.ApiResponse>(
                (resolve: angular.IQResolveReject<common.webservices.models.ApiResponse>, reject: angular.IQResolveReject<any>) => {
                    let fd: FormData = new FormData();
                    fd.append('additionalMetadata', additionalMetadata);
                    fd.append('file', file);
                    this.$http<common.webservices.models.ApiResponse>( {
                        method: 'POST',
                        data: fd,
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        },
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: common.webservices.models.ApiResponse) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('common').service('petClient', PetClient);
    export class StoreClient implements common.webservices.IStoreClient {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: app.IConfig) {
        }
        public getInventory(): angular.IPromise<any> {
            let resourceUrl: string = '/store/inventory';
            let queryParams: any = {
            };
            return new this.$q<any>(
                (resolve: angular.IQResolveReject<any>, reject: angular.IQResolveReject<any>) => {
                    this.$http<any>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: any) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public placeOrder(body: common.webservices.models.Order): angular.IPromise<common.webservices.models.Order> {
            let resourceUrl: string = '/store/order';
            let queryParams: any = {
            };
            return new this.$q<common.webservices.models.Order>(
                (resolve: angular.IQResolveReject<common.webservices.models.Order>, reject: angular.IQResolveReject<any>) => {
                    this.$http<common.webservices.models.Order>( {
                        method: 'POST',
                        data: body,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: common.webservices.models.Order) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public getOrderById(orderId: number): angular.IPromise<common.webservices.models.Order> {
            let resourceUrl: string = '/store/order/{orderId}'.replace('{orderId}', orderId.toString());
            let queryParams: any = {
            };
            return new this.$q<common.webservices.models.Order>(
                (resolve: angular.IQResolveReject<common.webservices.models.Order>, reject: angular.IQResolveReject<any>) => {
                    this.$http<common.webservices.models.Order>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: common.webservices.models.Order) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public deleteOrder(orderId: number): angular.IPromise<string> {
            let resourceUrl: string = '/store/order/{orderId}'.replace('{orderId}', orderId.toString());
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'DELETE',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('common').service('storeClient', StoreClient);
    export class UserClient implements common.webservices.IUserClient {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: app.IConfig) {
        }
        public createUser(body: common.webservices.models.User): angular.IPromise<string> {
            let resourceUrl: string = '/user';
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'POST',
                        data: body,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public createUsersWithArrayInput(body: common.webservices.models.User[]): angular.IPromise<string> {
            let resourceUrl: string = '/user/createWithArray';
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'POST',
                        data: body,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public createUsersWithListInput(body: common.webservices.models.User[]): angular.IPromise<string> {
            let resourceUrl: string = '/user/createWithList';
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'POST',
                        data: body,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public loginUser(username: string, password: string): angular.IPromise<string> {
            let resourceUrl: string = '/user/login';
            let queryParams: any = {
                 username: username,
                 password: password
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public logoutUser(): angular.IPromise<string> {
            let resourceUrl: string = '/user/logout';
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public getUserByName(username: string): angular.IPromise<common.webservices.models.User> {
            let resourceUrl: string = '/user/{username}'.replace('{username}', username.toString());
            let queryParams: any = {
            };
            return new this.$q<common.webservices.models.User>(
                (resolve: angular.IQResolveReject<common.webservices.models.User>, reject: angular.IQResolveReject<any>) => {
                    this.$http<common.webservices.models.User>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: common.webservices.models.User) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public updateUser(username: string, body: common.webservices.models.User): angular.IPromise<string> {
            let resourceUrl: string = '/user/{username}'.replace('{username}', username.toString());
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'PUT',
                        data: body,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public deleteUser(username: string): angular.IPromise<string> {
            let resourceUrl: string = '/user/{username}'.replace('{username}', username.toString());
            let queryParams: any = {
            };
            return new this.$q<string>(
                (resolve: angular.IQResolveReject<string>, reject: angular.IQResolveReject<any>) => {
                    this.$http<string>( {
                        method: 'DELETE',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: string) => {
                        resolve(data);
                    }
                    ).error((data: any) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('common').service('userClient', UserClient);
    function buildServiceUrl(baseUrl: string, resourceUrl: string, queryParams?: any): string {
        let url: string = baseUrl;
        let baseUrlSlash: boolean = url[url.length - 1] === '/';
        let resourceUrlSlash: boolean = resourceUrl[0] === '/';
        if (!baseUrlSlash && !resourceUrlSlash) {
            url += '/';
        }
        else if (baseUrlSlash && resourceUrlSlash) {
            url = url.substr(0, url.length - 1);
        }
        url += resourceUrl;

        if (queryParams) {
            let isFirst: boolean = true;
            for (let p in queryParams) {
                if (queryParams.hasOwnProperty(p) && queryParams[p]) {
                    let separator: string = isFirst ? '?' : '&';
                    url += `${separator}${p}=${encodeURI(queryParams[p])}`;
                    isFirst = false;
                }
            }
        }
        return url;
    }
}
namespace common.webservices.models {
    export interface ApiResponse {
        code: number;
        type: string;
        message: string;
    }
    export interface Category {
        id: number;
        name: string;
    }
    export interface Order {
        id: number;
        petId: number;
        quantity: number;
        shipDate: Date;
        status: string;
        complete: boolean;
    }
    export interface Pet {
        id: number;
        category: Category;
        name: string;
        photoUrls: string[];
        tags: Tag[];
        status: string;
    }
    export interface Tag {
        id: number;
        name: string;
    }
    export interface User {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        userStatus: number;
    }
    export class ModelFactory {
        public static createEmptyApiResponse(initializer?: (model: ApiResponse) => void): ApiResponse {
            let model: ApiResponse =  {
                code: undefined,
                type: '',
                message: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyCategory(initializer?: (model: Category) => void): Category {
            let model: Category =  {
                id: undefined,
                name: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyOrder(initializer?: (model: Order) => void): Order {
            let model: Order =  {
                id: undefined,
                petId: undefined,
                quantity: undefined,
                shipDate: undefined,
                status: '',
                complete: false,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyPet(initializer?: (model: Pet) => void): Pet {
            let model: Pet =  {
                id: undefined,
                category: ModelFactory.createEmptyCategory(),
                name: '',
                photoUrls: [],
                tags: [],
                status: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyTag(initializer?: (model: Tag) => void): Tag {
            let model: Tag =  {
                id: undefined,
                name: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyUser(initializer?: (model: User) => void): User {
            let model: User =  {
                id: undefined,
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone: '',
                userStatus: undefined,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
    }
}