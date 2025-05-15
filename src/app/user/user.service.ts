import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, filter, Observable, Subject, take} from 'rxjs';

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
    const users = [...this.users.value];
    const id = users.length > 0 ? Math.max(...users.map(u => u.id!)) + 1 : 1;
    const newUser = { ...user, id };
    users.push(newUser);
    this.users.next(users);
  }
}
