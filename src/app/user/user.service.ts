import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id?: number,
  name: string,
  email: string,
}

@Injectable({providedIn: 'root'})
export class UserService {
  private users = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((users: any) => {
      this.users.next(users);
    });
  }

  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  createUser(user: User): void {
    this.users.next([...this.users.value, user]);
  }
}
