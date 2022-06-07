import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseURL : string = 'https://restcountries.com/v2'
  private _regiones: string[]= ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get regiones(): string[]{
    return [...this._regiones]
  }

  constructor(private http: HttpClient) { }

  getpaisesPorRegion( region: string): Observable<PaisSmall[]>{
    const url : string= `${this.baseURL}/region/${region}?fields=name,alpha3Code`
    return this.http.get<PaisSmall[]>(url)
  }

  getPaisByCode(codigo: string): Observable<Pais | null>{
    if(!codigo){
      return of(null)
    }
    const url = `${this.baseURL}/alpha?codes=${codigo}`
    return this.http.get<Pais>(url)
  }

  getPaisByCodeSmall(codigo: string): Observable<PaisSmall>{
    /* if(!codigo){
      return of(null)
    } */
    const url = `${this.baseURL}/alpha?codes=${codigo}?fields=name,alpha3Code`
    return this.http.get<PaisSmall>(url)
  }

  getPaisesByCodigos(borders: string[]):Observable<PaisSmall[]>{
    if(!borders){
      return of([])
    }
    const peticiones: Observable<PaisSmall>[] = [] 

    borders.forEach(codigo => {
      const peticion = this.getPaisByCodeSmall(codigo);
      peticiones.push(peticion)
    });

    return combineLatest( peticiones)
  }
} 
