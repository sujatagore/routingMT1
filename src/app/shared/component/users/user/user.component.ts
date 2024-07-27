import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsers } from 'src/app/shared/module/users.interface';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userId !:string
  userObj !: IUsers | undefined

  constructor(
    private _routes : ActivatedRoute,
    private _usersService : UsersService,
    private _router : Router
  ) { }

  ngOnInit(): void {
      this.userId = this._routes.snapshot.params['userId'];
      if (this.userId) {
        this.userObj = this._usersService.getUserDetail(this.userId)
      }
  }

  gotoEditUser(){
      this._router.navigate(['editUser'],{
        relativeTo : this._routes,
        queryParamsHandling : 'preserve'
      })
  }

  removeUser(){
      if (this.userId) {
        this._usersService.removeUser(this.userId)
      }
  }

}
