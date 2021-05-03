import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CEPErrorCode } from './model/cep-error-code';
import { CEPError } from './model/cep-error';
import { BASE_URL } from './model/constantes';
import { validarCEP, validarEndereco } from './utils';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class NgxViacepService {
    constructor(http) {
        this.http = http;
    }
    /**
     * Busca o endereço a partir do CEP
     *
     * @param cep
     */
    buscarPorCep(cep) {
        return of(cep).pipe(validarCEP(), switchMap((cepValido) => this.http.get(`${BASE_URL}/${cepValido}/json`)), map((endereco) => {
            if ('cep' in endereco) {
                return endereco;
            }
            throw new CEPError(CEPErrorCode.CEP_NAO_ENCONTRADO);
        }));
    }
    /**
     * Faz a busca aproximada
     *
     * @param uf
     * @param municipio
     * @param logradouro
     */
    buscarPorEndereco(uf, municipio, logradouro) {
        return of({ uf, municipio, logradouro }).pipe(validarEndereco(), switchMap(() => this.http.get(`${BASE_URL}/${uf}/${municipio}/${logradouro}/json`)));
    }
}
NgxViacepService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxViacepService_Factory() { return new NgxViacepService(i0.ɵɵinject(i1.HttpClient)); }, token: NgxViacepService, providedIn: "root" });
NgxViacepService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
NgxViacepService.ctorParameters = () => [
    { type: HttpClient }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXZpYWNlcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYnJ1bm9jL25neC12aWFjZXAvc3JjL2xpYi9uZ3gtdmlhY2VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN0RCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFLaEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUcsQ0FBQztJQUV4Qzs7OztPQUlHO0lBQ0gsWUFBWSxDQUFDLEdBQVc7UUFDdEIsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUNqQixVQUFVLEVBQUUsRUFDWixTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBVyxHQUFHLFFBQVEsSUFBSSxTQUFTLE9BQU8sQ0FBQyxDQUN6RCxFQUNELEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2YsSUFBSSxLQUFLLElBQUksUUFBUSxFQUFFO2dCQUNyQixPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUNELE1BQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxpQkFBaUIsQ0FDZixFQUFVLEVBQ1YsU0FBaUIsRUFDakIsVUFBa0I7UUFFbEIsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMzQyxlQUFlLEVBQUUsRUFDakIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNYLEdBQUcsUUFBUSxJQUFJLEVBQUUsSUFBSSxTQUFTLElBQUksVUFBVSxPQUFPLENBQ3BELENBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7OztZQTlDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQVhRLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEVuZGVyZWNvIH0gZnJvbSAnLi9tb2RlbC9lbmRlcmVjbyc7XG5pbXBvcnQgeyBDRVBFcnJvckNvZGUgfSBmcm9tICcuL21vZGVsL2NlcC1lcnJvci1jb2RlJztcbmltcG9ydCB7IENFUEVycm9yIH0gZnJvbSAnLi9tb2RlbC9jZXAtZXJyb3InO1xuaW1wb3J0IHsgQkFTRV9VUkwgfSBmcm9tICcuL21vZGVsL2NvbnN0YW50ZXMnO1xuaW1wb3J0IHsgdmFsaWRhckNFUCwgdmFsaWRhckVuZGVyZWNvIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5neFZpYWNlcFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgLyoqXG4gICAqIEJ1c2NhIG8gZW5kZXJlw6dvIGEgcGFydGlyIGRvIENFUFxuICAgKlxuICAgKiBAcGFyYW0gY2VwXG4gICAqL1xuICBidXNjYXJQb3JDZXAoY2VwOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEVuZGVyZWNvPiB7XG4gICAgcmV0dXJuIG9mKGNlcCkucGlwZShcbiAgICAgIHZhbGlkYXJDRVAoKSxcbiAgICAgIHN3aXRjaE1hcCgoY2VwVmFsaWRvKSA9PlxuICAgICAgICB0aGlzLmh0dHAuZ2V0PEVuZGVyZWNvPihgJHtCQVNFX1VSTH0vJHtjZXBWYWxpZG99L2pzb25gKVxuICAgICAgKSxcbiAgICAgIG1hcCgoZW5kZXJlY28pID0+IHtcbiAgICAgICAgaWYgKCdjZXAnIGluIGVuZGVyZWNvKSB7XG4gICAgICAgICAgcmV0dXJuIGVuZGVyZWNvO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBDRVBFcnJvcihDRVBFcnJvckNvZGUuQ0VQX05BT19FTkNPTlRSQURPKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGYXogYSBidXNjYSBhcHJveGltYWRhXG4gICAqXG4gICAqIEBwYXJhbSB1ZlxuICAgKiBAcGFyYW0gbXVuaWNpcGlvXG4gICAqIEBwYXJhbSBsb2dyYWRvdXJvXG4gICAqL1xuICBidXNjYXJQb3JFbmRlcmVjbyhcbiAgICB1Zjogc3RyaW5nLFxuICAgIG11bmljaXBpbzogc3RyaW5nLFxuICAgIGxvZ3JhZG91cm86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPEVuZGVyZWNvW10+IHtcbiAgICByZXR1cm4gb2YoeyB1ZiwgbXVuaWNpcGlvLCBsb2dyYWRvdXJvIH0pLnBpcGUoXG4gICAgICB2YWxpZGFyRW5kZXJlY28oKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICB0aGlzLmh0dHAuZ2V0PEVuZGVyZWNvW10+KFxuICAgICAgICAgIGAke0JBU0VfVVJMfS8ke3VmfS8ke211bmljaXBpb30vJHtsb2dyYWRvdXJvfS9qc29uYFxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19