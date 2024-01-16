import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender: ["M", Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {

  }

  checkTerms():boolean{
    if(this.myForm.controls["termsAndConditions"].value == true){
      return true;
    }
    return false;
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

  }

}
