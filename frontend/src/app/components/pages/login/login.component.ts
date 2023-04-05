import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    
   }

  returnUrl = ''
  loginForm!: FormGroup
  isSubmitted = false

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.minLength(5), Validators.required]],
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    console.log(this.fc.email.touched)
  }

  get fc(){
    return this.loginForm.controls
  }

  login(form: FormGroup): void {
    this.isSubmitted = true
    console.log(this.isSubmitted)
    if(this.loginForm.invalid) return

    this.userService.login({
      email: form.value.email,
      password: form.value.password
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    })

  }

}
