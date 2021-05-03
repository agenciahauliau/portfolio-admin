(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@brunoc/ngx-viacep', ['exports', '@angular/common/http', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.brunoc = global.brunoc || {}, global.brunoc['ngx-viacep'] = {}), global.ng.common.http, global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, i1, i0, rxjs, operators) { 'use strict';

    var NgxViacepModule = /** @class */ (function () {
        function NgxViacepModule() {
        }
        return NgxViacepModule;
    }());
    NgxViacepModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [],
                    imports: [
                        i1.HttpClientModule
                    ],
                    exports: []
                },] }
    ];

    // eslint-disable-next-line no-shadow
    (function (CEPErrorCode) {
        CEPErrorCode[CEPErrorCode["CEP_NAO_ENCONTRADO"] = 0] = "CEP_NAO_ENCONTRADO";
        CEPErrorCode[CEPErrorCode["CEP_VAZIO"] = 1] = "CEP_VAZIO";
        CEPErrorCode[CEPErrorCode["CEP_INVALIDO"] = 2] = "CEP_INVALIDO";
        CEPErrorCode[CEPErrorCode["CEP_MUITO_CURTO"] = 3] = "CEP_MUITO_CURTO";
        CEPErrorCode[CEPErrorCode["CEP_MUITO_LONGO"] = 4] = "CEP_MUITO_LONGO";
        CEPErrorCode[CEPErrorCode["UF_VAZIA"] = 5] = "UF_VAZIA";
        CEPErrorCode[CEPErrorCode["UF_MUITO_CURTA"] = 6] = "UF_MUITO_CURTA";
        CEPErrorCode[CEPErrorCode["UF_MUITO_LONGA"] = 7] = "UF_MUITO_LONGA";
        CEPErrorCode[CEPErrorCode["UF_NAO_EXISTE"] = 8] = "UF_NAO_EXISTE";
        CEPErrorCode[CEPErrorCode["MUNICIPIO_VAZIO"] = 9] = "MUNICIPIO_VAZIO";
        CEPErrorCode[CEPErrorCode["MUNICIPIO_MUITO_CURTO"] = 10] = "MUNICIPIO_MUITO_CURTO";
        CEPErrorCode[CEPErrorCode["LOGRADOURO_VAZIO"] = 11] = "LOGRADOURO_VAZIO";
        CEPErrorCode[CEPErrorCode["LOGRADOURO_MUITO_CURTO"] = 12] = "LOGRADOURO_MUITO_CURTO";
        CEPErrorCode[CEPErrorCode["ERRO_SERVIDOR"] = 13] = "ERRO_SERVIDOR";
    })(exports.CEPErrorCode || (exports.CEPErrorCode = {}));

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var CEPError = /** @class */ (function (_super) {
        __extends(CEPError, _super);
        function CEPError(code) {
            var _this = _super.call(this, exports.CEPErrorCode[code]) || this;
            _this.code = code;
            Object.setPrototypeOf(_this, CEPError.prototype);
            return _this;
        }
        /**
         * Returns the Error code
         */
        CEPError.prototype.getCode = function () {
            return this.code;
        };
        return CEPError;
    }(Error));

    var BASE_URL = 'https://viacep.com.br/ws';
    var UFS_VALIDAS = [
        'AC',
        'AL',
        'AM',
        'AP',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MG',
        'MS',
        'MT',
        'PA',
        'PB',
        'PE',
        'PI',
        'PR',
        'RJ',
        'RN',
        'RO',
        'RR',
        'RS',
        'SC',
        'SE',
        'SP',
        'TO',
    ];

    var throwCepError = function (error) {
        throw new CEPError(error);
    };
    var ɵ0 = throwCepError;
    var ehStringValida = function (data) { return !!data && data.trim() !== ''; };
    var ɵ1 = ehStringValida;
    var hasMinLength = function (data, minLength) { return data.trim().length >= minLength; };
    var ɵ2 = hasMinLength;
    var hasMaxLength = function (data, maxLength) { return data.trim().length <= maxLength; };
    var ɵ3 = hasMaxLength;
    var validarMunicipio = function (municipio) {
        if (!ehStringValida(municipio)) {
            throwCepError(exports.CEPErrorCode.MUNICIPIO_VAZIO);
        }
        if (!hasMinLength(municipio, 3)) {
            throwCepError(exports.CEPErrorCode.MUNICIPIO_MUITO_CURTO);
        }
    };
    var ɵ4 = validarMunicipio;
    var validarLogradouro = function (logradouro) {
        if (!ehStringValida(logradouro)) {
            throwCepError(exports.CEPErrorCode.LOGRADOURO_VAZIO);
        }
        if (!hasMinLength(logradouro, 3)) {
            throwCepError(exports.CEPErrorCode.LOGRADOURO_MUITO_CURTO);
        }
    };
    var ɵ5 = validarLogradouro;
    var validarUF = function (uf) {
        if (!ehStringValida(uf)) {
            throwCepError(exports.CEPErrorCode.UF_VAZIA);
        }
        if (!hasMinLength(uf, 2)) {
            throwCepError(exports.CEPErrorCode.UF_MUITO_CURTA);
        }
        if (!hasMaxLength(uf, 2)) {
            throwCepError(exports.CEPErrorCode.UF_MUITO_LONGA);
        }
        if (!UFS_VALIDAS.some(function (it) { return it.toLowerCase() === uf.toLowerCase(); })) {
            throwCepError(exports.CEPErrorCode.UF_NAO_EXISTE);
        }
    };
    var ɵ6 = validarUF;
    var validarCEP = function () { return function (source) { return new rxjs.Observable(function (subscriber) { return source.subscribe({
        next: function (cep) {
            try {
                var regex = new RegExp(/^[0-9]+$/);
                if (!ehStringValida(cep)) {
                    throwCepError(exports.CEPErrorCode.CEP_VAZIO);
                }
                if (!regex.test(cep)) {
                    throwCepError(exports.CEPErrorCode.CEP_INVALIDO);
                }
                if (cep.length < 8) {
                    throwCepError(exports.CEPErrorCode.CEP_MUITO_CURTO);
                }
                if (cep.length > 8) {
                    throwCepError(exports.CEPErrorCode.CEP_MUITO_LONGO);
                }
                subscriber.next(cep.trim());
            }
            catch (e) {
                subscriber.error(e);
            }
        },
        error: function (error) { return subscriber.error(error); },
        complete: function () { return subscriber.complete(); },
    }); }); }; };
    var validarEndereco = function () { return function (source) { return new rxjs.Observable(function (subscriber) { return source.subscribe({
        next: function (_a) {
            var uf = _a.uf, logradouro = _a.logradouro, municipio = _a.municipio;
            try {
                validarUF(uf);
                validarMunicipio(municipio);
                validarLogradouro(logradouro);
            }
            catch (e) {
                subscriber.error(e);
            }
            subscriber.next({ uf: uf, logradouro: logradouro, municipio: municipio });
        },
        error: function (error) { return subscriber.error(error); },
        complete: function () { return subscriber.complete(); },
    }); }); }; };

    var NgxViacepService = /** @class */ (function () {
        function NgxViacepService(http) {
            this.http = http;
        }
        /**
         * Busca o endereço a partir do CEP
         *
         * @param cep
         */
        NgxViacepService.prototype.buscarPorCep = function (cep) {
            var _this = this;
            return rxjs.of(cep).pipe(validarCEP(), operators.switchMap(function (cepValido) { return _this.http.get(BASE_URL + "/" + cepValido + "/json"); }), operators.map(function (endereco) {
                if ('cep' in endereco) {
                    return endereco;
                }
                throw new CEPError(exports.CEPErrorCode.CEP_NAO_ENCONTRADO);
            }));
        };
        /**
         * Faz a busca aproximada
         *
         * @param uf
         * @param municipio
         * @param logradouro
         */
        NgxViacepService.prototype.buscarPorEndereco = function (uf, municipio, logradouro) {
            var _this = this;
            return rxjs.of({ uf: uf, municipio: municipio, logradouro: logradouro }).pipe(validarEndereco(), operators.switchMap(function () { return _this.http.get(BASE_URL + "/" + uf + "/" + municipio + "/" + logradouro + "/json"); }));
        };
        return NgxViacepService;
    }());
    NgxViacepService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxViacepService_Factory() { return new NgxViacepService(i0.ɵɵinject(i1.HttpClient)); }, token: NgxViacepService, providedIn: "root" });
    NgxViacepService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    NgxViacepService.ctorParameters = function () { return [
        { type: i1.HttpClient }
    ]; };

    /*
     * Public API Surface of ngx-viacep
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CEPError = CEPError;
    exports.NgxViacepModule = NgxViacepModule;
    exports.NgxViacepService = NgxViacepService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=brunoc-ngx-viacep.umd.js.map
