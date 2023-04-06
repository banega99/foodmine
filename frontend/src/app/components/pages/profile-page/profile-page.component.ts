import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  user!: User
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService){
    activatedRoute.params.subscribe(params => {
      if(!params.id) return

      userService.getUserProfie(params.id).subscribe(user => {
        console.log(user)
        this.user = user
      })
    })
  }
}
