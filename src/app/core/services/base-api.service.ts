import { environment } from "./../../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export abstract class BaseApiService {
  private readonly environmentUrl = environment.baseUrl;

  protected abstract baseEndPoint;

  constructor(protected http: HttpClient) {}

  public getAll<T>(path: string, parameter?: any): Observable<any> {
    return this.http.get<T>(
      `${this.environmentUrl}${this.baseEndPoint}${path}`,
      parameter
    );
  }

  public updateElement(id: number, parameter: any): Observable<any> {
    return this.http.put( `${this.environmentUrl}${this.baseEndPoint}/${id}`, parameter);
  }

  public createElement(path?: string, parameter?: any): Observable<any> {
    return this.http.post(`${this.environmentUrl}${this.baseEndPoint}${path}`|| `${this.environmentUrl}${this.baseEndPoint}`, parameter);
  }

  public getElementById(id: number, parameter?: any): Observable<any> {
    return this.http.get(
      `${this.environmentUrl}${this.baseEndPoint}/${id}`,
      parameter
    );
  }
  
  public deleteElementById(id: number, parameter?: any): Observable<any> {
    return this.http.delete(
      `${this.environmentUrl}${this.baseEndPoint}/${id}`,parameter
    );
  }
}
