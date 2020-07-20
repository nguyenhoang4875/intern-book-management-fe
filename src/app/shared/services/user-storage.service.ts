import { Injectable } from '@angular/core';
import { BaseApiService } from '../../core/services/base-api.service';
import { Observable } from 'rxjs';
import { UserDetail } from '../model/user-detail.model';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService extends BaseApiService {
  private readonly imagesEP = 'images';
  private readonly allUsersEP = 'all';
  private readonly registerEP = 'register';

  public baseEndPoint = 'users';

  public addUser(userDetail: UserDetail): Observable<UserDetail> {
    return this.http.post<UserDetail>(
      this.environmentUrl + 'register',
      userDetail
    );
  }

  public fetchUsers(): Observable<UserDetail[]> {
    return this.getElements('');
  }

  public fetchAllUsers(): Observable<UserDetail[]> {
    return this.getElements(this.allUsersEP);
  }

  public getUserById(id: number): Observable<UserDetail> {
    return this.getElementById(id);
  }

  public updateUser(
    id: number,
    userDetail: UserDetail
  ): Observable<UserDetail> {
    return this.updateElement(id, userDetail);
  }

  public deleteUserById(id: number): Observable<any> {
    return this.deleteElementById(id);
  }

  public postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.environmentUrl + this.imagesEP, formData);
  }
}
