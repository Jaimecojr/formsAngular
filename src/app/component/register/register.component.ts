import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validations from 'src/app/validations/validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /** Como se inician las variables en el form */
  form: FormGroup = new FormGroup({
    typeUser: new FormControl(1),
    nameUser: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /** Validaciones que se van a realizar */
    this.form = this.formBuilder.group(
      {
        typeUser: [1],
        nameUser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validations.match('password', 'confirmPassword')]
      }
    );
  }

  /** Metodo que nos permite acceder a cada formControl */
  get f(): { [key:string]: AbstractControl}{
    return this.form.controls;
  }
 
  /** Crear metodo boton enviar */
  onSubmit(): void{
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
 
  /** MEtodo boton limpiar campos */
  onReset():void{
    this.submitted = false;
    this.form.reset();
  }

}
