import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trello } from './trello-list.model';
import { Observable } from 'rxjs/Observable';
import { REST } from '../../app.config';
import { DEFAULT_TRELLO } from './trello.config';

@Injectable()
export class TrelloListService {
  constructor (private http: HttpClient) {
  }

  public getTrello (): Observable<any> {
    return this.http.get(REST.trello);
  }

  public setTrello (trelloTitle: string): Observable<any> {
    const trello: Trello = Object.assign(DEFAULT_TRELLO, {title: trelloTitle});

    return this.http.post(REST.trello, trello);
  }

  public deleteTrello (id: number): Observable<any> {
    return this.http.delete(`${REST.trello}/${id}`);
  }

  public changeTrello (trello: Trello): Observable<any> {
    return this.http.put(`${REST.trello}/${trello.id}`, trello);
  }
}
