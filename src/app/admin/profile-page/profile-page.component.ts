import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { ProfileUser } from '../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: ProfileUser;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.user = users.find(user => user.uid === localStorage.getItem('uid'));
    });
  }
}
