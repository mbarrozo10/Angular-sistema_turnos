import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  nombre:string="";
  apellidos:string="";
  correo:string="";
  img:string="";
  tipo:string="";
  img2:string="";
  constructor(private firestore:Firestore, private auth:UserService){}

  ngOnInit(): void {
    this.auth.conseguirUsuario().then(() => {
      console.log(this.auth.userUsed);
      this.nombre = this.auth.userUsed['nombre'];
      this.apellidos = this.auth.userUsed['apellido'];
      this.correo = this.auth.userUsed['correo'];
      this.tipo=this.auth.userUsed['tipo']
      if(this.auth.userUsed['tipo']=="user"){
        this.img = this.auth.userUsed['img1'];
        this.img2= this.auth.userUsed['img2'];
      }else{
        this.img= this.auth.userUsed['img']
      }
    }); 
  }
  
}
