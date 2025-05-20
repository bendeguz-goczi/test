import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';
import {User, UserService} from './user.service';
import {HighlightDirective} from '../highlight.directive';
import {FilterByDomainDirective} from '../filter-by-domain.directive';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HighlightDirective, FilterByDomainDirective, FormsModule],
  template: `
    <h2>List of users:</h2>
    @let users = users$ | async;
    @if (users) {
      @for (user of users; track user.id) {
        <div *filterByDomain="domainFilter; email: user.email" >
          <span highlight>{{ user.name }}</span>
          <span style="margin-left: 0.5rem;">{{ user.email }}</span>
        </div>
      }
    } @else {
      No users found
    }
    <div style="display: flex; align-items: center">
      <h3>Filter by domain:</h3>
      <input style="height: 1.5rem; margin-left: 1rem;" [(ngModel)]="domainFilter">
    </div>
    <button [title]="addUserText" (click)="addUser()">Add user</button>
  `,
})
export class UserComponent {
  users$: Observable<User[]> = new Observable();
  domainFilter = '';
  addUserText = 'Click here to add a new user';

  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }

  addUser(): void {
    this.userService.createUser({id: 100, name: 'New User', email: 'email@test.com'});
  }
}
