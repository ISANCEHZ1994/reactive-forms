import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit(){ 
    this.signupForm = new FormGroup({
      // the string will represent the same 'name' in the formControlName prop in HTML file 
      'username': new FormControl(null),
         'email': new FormControl(null),
        'gender': new FormControl('male'),

    });
  };

  onSubmit(){
    console.log(this.signupForm);
  };


}
