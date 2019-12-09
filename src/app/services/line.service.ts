import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Tag} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {Observable} from 'rxjs';
import {Line} from '../model/line';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LineService {

  private lineUrl = environment.lineUrl;

  constructor(private http: HttpClient) { }

  getLineList(): Observable<Line[]> {
    return this.http.get<Line[]>(this.lineUrl);
  }

  createLine(line: Line): Observable<Line> {
    return this.http.post<Line>(this.lineUrl , line);
  }

  updateLine(line: Line): Observable<Line> {
    return this.http.put<Line>(this.lineUrl + line.id , line);
  }

  deleteLine(id: string): Observable<void> {
    return this.http.delete<void>(this.lineUrl + id);
  }

  searchLineByName(line: Line): Observable<Line[]> {
    return this.http.post<Line[]>(this.lineUrl + 'search-by-name', line);
  }
}
