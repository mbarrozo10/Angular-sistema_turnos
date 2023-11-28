import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { UserCredential } from '@angular/fire/auth';
import { animate, state, style, transition, trigger } from '@angular/animations';

const fadeIn= trigger('fadeIn',[
  state('void', style({
    transform: 'translateY(1000px)',
    opacity: 0
  })),
  transition('void => *', animate('0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)')),
  state('*', style({
    transform: 'translateY(0)',
    opacity: 1
  })),
]) 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],animations: [fadeIn]
})
export class LoginComponent implements OnInit {
   
    pass=""
    correo=""
    usuariosMuestra:any[] = [];
constructor(private auth: UserService, private router: Router, private firestore: Firestore){
}

Registrar(){
  this.router.navigateByUrl("registrar",{replaceUrl:true})
}
  ngOnInit(): void {
    const ref=collection(this.firestore, "usuarios")
    collectionData(ref).subscribe(usuarios =>{
      this.usuariosMuestra = []
      const usuariosAdmin= usuarios.filter(usuarios => usuarios['tipo']=="admin")
      const usuariosEspecialistas= usuarios.filter(usuarios => usuarios['tipo']=="especialista")
      const usuariosNormales= usuarios.filter(usuarios => usuarios['tipo']=="user")
      this.usuariosMuestra.push(usuariosAdmin[0])
      this.usuariosMuestra.push(usuariosEspecialistas[0],usuariosEspecialistas[1])
      this.usuariosMuestra.push(usuariosNormales[0],usuariosNormales[1],usuariosNormales[2])
      console.log(this.usuariosMuestra)
    })
  }
  async login() {
    if (this.correo != "" && this.pass != "") {
      try {
        const user = await this.auth.login(this.correo, this.pass);
        // console.log(user);
        const usuario:any = await this.verificarUsuario(user);
        this.auth.conseguirUsuario();
        if (usuario['tipo'] != "admin" && !user.user.emailVerified) {
          Swal.fire({
            icon: "error",
            title: "Tu correo no fue verificado",
            heightAuto: false

          });
        }else if (usuario['tipo'] == "especialista" && !usuario['habilitado']){
          Swal.fire({
            icon: "error",
            title: "Tu cuenta fue bloqueada",
            text: "Ponete en contacto con el administrador",
            heightAuto: false

          });
        } else {
          this.router.navigateByUrl("main", { replaceUrl: true });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Algo salió mal!",
          text: "¿Quizás te equivocaste en algo?",
          heightAuto: false

        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal!",
        text: "¿Quizás olvidaste algo?",
        heightAuto: false
      });
    }
  }
  
  async verificarUsuario(user: UserCredential) {
    const placeref = collection(this.firestore, 'usuarios');
    return new Promise((resolve) => {
      collectionData(placeref).subscribe((data) => {
        for (const x of data) {
          if (x['correo'] === user.user.email) {
            // console.log(x);
            resolve(x); 
            return;
          }
        }
        resolve(null); 
      });
    });
  }

  verificar(usuario :any){
    console.log(usuario);
    if(usuario['tipo']!="user"){
      return true;
    }else{
      return false
    }
  }
   
  inicioRapido(user:string, password:string){
    this.correo=user;
    this.pass=password;
  }

 
}


