import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-random-user',
  templateUrl: './random-user.component.html',
  styleUrls: ['./random-user.component.css']
})
export class RandomUserComponent implements OnInit {

  user: User = new User();
  userName: string = '';
  userAddress: string = '';
  country: string = '';
  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUser().then(res => {
      this.setUser(res);
    });

  }

  setUser(user: User) {
    this.user = user;
  }

  refresh() {
    this.router.navigate(['user'])
      .then(() => {
        window.location.reload();
      });
  }

}
