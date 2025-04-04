import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllEmployeesService {

  constructor(private _httpClient:HttpClient) { }
  baseUrl:string="https://6572df5d192318b7db412dfe.mockapi.io/employees"

  getAllEmployees():Observable<any>{
    return this._httpClient.get(this.baseUrl)
  }
  getAllEmployee(id:any):Observable<any>{
    return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees/"+id)
  }
  getfilteredAllEmployees(term:any):Observable<any>{
    return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees?filter="+term);
  }
  getsortedAllEmployees(column:any,order:any):Observable<any>{
    return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees?sortBy="+column+"&order="+order);
  }
  getpaginatedAllEmployees(limit:any,page:any):Observable<any>{
    return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees?sortBy="+limit+"&page"+page)
  }
  deletedemployee(id:any):Observable<any>{
    return this._httpClient.get("https://6572df5d192318b7db412dfe.mockapi.io/employees/"+id)
  }
  createemployee(data:any):Observable<any>{
    return this._httpClient.post("https://6572df5d192318b7db412dfe.mockapi.io/employees?filter",data)
  }
  updateemployee(id:any,data:any):Observable<any>{
    return this._httpClient.put("https://6572df5d192318b7db412dfe.mockapi.io/employees?filter/"+id,data)
  }
}
