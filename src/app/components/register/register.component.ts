import { Component } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { ConfigService } from '../../services/config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticatorService } from '../../services/authenticator.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IRegister } from '../../models/ipost';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    public utilities:UtilitiesService,
    private authServices:AuthenticatorService,
    private router:Router,
    public configServices:ConfigService
  ){
    this.registerForm = new FormGroup({
      nome: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexNome)]),
      cognome: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexNome)]),
      email:new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexEmail)]),
      password: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexPasswordCreate)]),
      passwordCheck: new FormControl("",[Validators.required,Validators.pattern(this.configServices.regexPasswordCreate)]),
      privacyCheck: new FormControl(false,Validators.requiredTrue)

    })
  }

  showThanks:boolean = false;
  registerForm:FormGroup;
  subForm:Subscription;
  sub:Subscription;

  ngOnInit():void {
    this.showThanks=false;
    this.subForm = this.registerForm.get("passwordCheck").valueChanges.subscribe(
      () => this.passwordControll()
    )
  }

  ngOnDestroy():void {
    this.subForm.unsubscribe();
    if (this.registerForm.valid)  this.sub.unsubscribe();
  }

  submit(){
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const user:IRegister={
        nome:this.registerForm.get("nome").value,
        cognome:this.registerForm.get("cognome").value,
        email:this.registerForm.get("email").value,
        password:this.registerForm.get("password").value,
        privacyCheck:this.registerForm.get("privacyCheck").value

    }
    this.sub = this.authServices.register(user).subscribe({
      next: success => {
        this.showThanks= true;
        console.log("TUTTO BENE BUSTO!!!",success)},
      error: error => this.router.navigateByUrl("/404")
    })
    

  }


  //method privato che controlla se le due password siano uguali, in caso negativo attiva un codice di errore personalizzato, necessario a far partire il messaggio d'errore per utente, altrimenti cancella l'errore settandolo su null.
  private passwordControll():void{
    const passwordBase = this.registerForm.get("password");
    const passwordControl = this.registerForm.get("passwordCheck");

    passwordBase.value !== passwordControl.value ? 
      passwordControl.setErrors({passwordDiverse: true}):
      passwordControl.setErrors(null);

    console.log(passwordControl.errors)

  }

}
