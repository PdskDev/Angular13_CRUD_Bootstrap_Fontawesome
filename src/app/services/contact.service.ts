import { IContact } from './../models/IContact';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  //Json-server url
  private serverURL: string = `http://localhost:9000`;

  constructor(private httpClient: HttpClient) {}

  //Get all contacts
  public getAllContacts(): Observable<IContact[]> {
    let dataURL: string = `${this.serverURL}/contacts`;
    return this.httpClient
      .get<IContact[]>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //Get single contact
  public getSingleContact(contactID: string): Observable<IContact> {
    let dataURL: string = `${this.serverURL}/contacts/${contactID}`;
    return this.httpClient
      .get<IContact>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //Create a contact
  public createContact(contact: IContact): Observable<IContact> {
    let dataURL: string = `${this.serverURL}/contacts/`;
    return this.httpClient
      .post<IContact>(dataURL, contact)
      .pipe(catchError(this.handleError));
  }

  //Update contact
  public updateContact(
    contact: IContact,
    contactId: string
  ): Observable<IContact> {
    let dataURL: string = `${this.serverURL}/contacts/${contactId}`;
    return this.httpClient
      .put<IContact>(dataURL, contact)
      .pipe(catchError(this.handleError));
  }

  //Delete contact
  public deleteContact(contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverURL}/contacts/${contactId}`;
    return this.httpClient
      .delete<IContact>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //Get all groups
  public getAllGroups(): Observable<IGroup[]> {
    let dataURL: string = `${this.serverURL}/groups`;
    return this.httpClient
      .get<IGroup[]>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //Get single group
  public getSingleGroup(contact: IContact): Observable<IGroup> {
    let dataURL: string = `${this.serverURL}/groups/${contact.groupId}`;
    return this.httpClient
      .get<IGroup>(dataURL)
      .pipe(catchError(this.handleError));
  }

  //Error handling
  public handleError(ResponseError: HttpErrorResponse) {
    let errorMessage: string = '';
    if (ResponseError.error instanceof ErrorEvent) {
      //Client Error
      errorMessage = `Error: ${ResponseError.error.message}`;
    } else {
      //Server error
      errorMessage = `Status: ${ResponseError.status} \n message: ${ResponseError.message}`;
    }
    return throwError(() => new Error(errorMessage));
    //return throwError(errorMessage);
  }
}
