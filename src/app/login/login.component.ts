import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    registrarUsuario:boolean = true;
    selectedValue: string="usuario";
    imagenes:string = "Elija 2 imagenes para su perfil";
    pass=""
    correo=""
    obras: any[] = [];
    especialidades:any[] = [];
constructor(private auth: UserService, private router: Router, private firestore: Firestore){

}
  ngOnInit(): void {
    const placeRef =  collection(this.firestore, 'obraSocial');
    collectionData(placeRef).subscribe(data => {
      this.obras=[]
      data.forEach(d => {
        this.obras.push(d);
      });
    });
    const x =  collection(this.firestore, 'especialidades');
    collectionData(x).subscribe(data => {
      this.especialidades=[]
      data.forEach(d => {
        this.especialidades.push(d);
      });
    });
  }


  async login(){
      if(this.correo != "" && this.pass != ""){
        await this.auth.login(this.correo, this.pass).then(() => {
          this.router.navigateByUrl("main",{replaceUrl:true})
        }).catch(() => {
          Swal.fire({
            icon:"error",
            title:"Algo salio mal!",
            text: "Quiza te equivocaste en algo?"
          })
        });
      }else{
        Swal.fire({
          icon:"error",
          title:"Algo salio mal!",
          text: "Quiza olvidaste algo?"
        })
      }
  }

    onSelectChange() {
      if(this.selectedValue=="usuario") {
        this.imagenes="Elija 2 imagenes para su perfil"
        this.registrarUsuario = true}
      else {
        this.imagenes="Elija 1 imagen para su perfil"
        this.registrarUsuario = false}
    }

    guardarImagenes(files: FileList | null): void {
     
    }

    async newImage(event: any) {
      let files
      if(this.selectedValue=="usuario"){
       files= event.target.files;
       const imagenes: File[] = [];
      for (let i = 0; i < files.length; i++) {
        imagenes.push(files[i]);
      }
     console.log(imagenes);}
      else{
       files= event.target.files[0];
       console.log(files)
      }
    }
}
