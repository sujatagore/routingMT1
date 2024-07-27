import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUsers } from 'src/app/shared/module/users.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm !: FormGroup;
  userId !: string;
  userObj !: IUsers | undefined
  userRole !: 'admin' | 'buyer';
  isinEditMode :boolean = false;

  constructor(
    private _routes: ActivatedRoute,
    private _userService : UsersService,
    private _uuidService : UuidService
  ) { }

  ngOnInit(): void {
    this.createUserForm();
    this.patchUser();
    this.manageQueryParams();
  }

  createUserForm(){
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required]),
      userEmail: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9.-]+@[a-zA-Z0-9-.]+\\.[a-zA-Z]{2,100}$')]),
      userPhone: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      userAddress: new FormControl(null, [Validators.required]),
    })
  }

  patchUser(){
    this.userId = this._routes.snapshot.params['userId'];
    if (this.userId) {
      this.isinEditMode = true;
      this.userObj = this._userService.getUserDetail(this.userId)!;
      this.userForm.patchValue(this.userObj)
    } else{
      this.isinEditMode = false
    }
  }

  manageQueryParams(){
    this.userRole = this._routes.snapshot.queryParams['userRole'];
    if (this.userRole) {
      if (this.userRole === 'buyer') {
        this.userForm.disable();
      } else {
        this.userForm.enable();
      }
    }
  }

  onUserAdd(){
      if (this.userForm.valid) {
        let newUser : IUsers = {...this.userForm.getRawValue(), userId: this._uuidService.uuid()}
        this._userService.addUser(newUser);
        console.log(newUser)
      }
  }

  onUpdateUser(){
      if (this.userForm.valid) {
        let updUserObj = {...this.userForm.value, userId:this.userId};
        this._userService.updateUser(updUserObj)
      }
  }

  get uc(){
    return this.userForm.controls
  }

}
