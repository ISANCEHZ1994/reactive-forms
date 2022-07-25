import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { rejects } from 'assert';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', "Aaron", "Anna"];

  constructor(private formBuild: FormBuilder){};

  ngOnInit(){ 
    this.signupForm = new FormGroup({
      'userData': new FormGroup({ // NEW GROUPING CONTROLS
                                            // forbiddenNames() used here for validation!
          'username': new FormControl(null, [ Validators.required, this.forbiddenNames.bind(this) ]),
                                            // when typing a different email from test@test.com - inspect mode can see changes:
                                            // ng-invalid => ng-pending => ng-valid
             'email': new FormControl(null, [ Validators.required, Validators.email ], this.forbiddenEmails),
      }),
      // the string will represent the same 'name' in the formControlName prop in HTML file 
      // note the validation that we are using to make sure everything is correct!
      // MOVED TO userData FormGroup({})
      // 'username': new FormControl(null, Validators.required),
      //    'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'gender':  new FormControl('male'),
      'hobbies': new FormArray([])
    });
  };

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  };

  onSubmit(){
    console.log(this.signupForm);
  };

  onAddHobby(){
    const control = new FormControl( null, Validators.required );
     (<FormArray>this.signupForm.get('hobbies')).push(control);
  };  

  // Creating a Custom Validators
  forbiddenNames( control: FormControl ): {[ s: string ]: boolean}{
    if( this.forbiddenUsernames.indexOf(control.value) !== -1 ){
      return { 'nameIsForbidden': true };      
    }
    return null;
  };

  // Creating a custom Async Validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>(( resolve, reject ) => {
        setTimeout(() => {
          if( control.value === 'test@test.com' ){
              resolve({ 'emailsIsForbidden': true });
          } else {
            resolve( null );
          }
        }, 1500);
    });
    return promise;
  };

};
