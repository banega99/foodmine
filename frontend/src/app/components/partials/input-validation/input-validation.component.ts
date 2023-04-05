import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Should not be emnpty',
  email: 'Email is not valid',
  minlength: 'Password must be at least 5 characters long', 
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()control!: AbstractControl
  @Input()showErrorsWhen!:boolean

  errorMessages: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=> {
      this.checkValidation()
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  checkValidation(): void {
    const errors = this.control.errors
    if(!errors){
      this.errorMessages = []
      return
    }

    const errorKeys = Object.keys(errors)
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }

}
