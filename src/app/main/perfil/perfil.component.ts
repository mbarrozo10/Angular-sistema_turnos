import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { PdfServiceService } from 'src/app/services/pdf.service.service';
import { UserService } from 'src/app/services/user.service';
import { ITurnos } from '../turnos/vista-paciente/vista-paciente.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  displayedColumns: string[] = ['doctor', 'especialidad', 'fecha','horario','altura','peso','presion','temperatura','clave','cantidad'];

  nombre:string="";
  apellidos:string="";
  correo:string="";
  imgMuesta:string="";
  img:string="";
  tipo:string="";
  img2:string="";
  turnos:any[]=[];
  especialidades:any[]=[]
  espec:any
  dataSource:any=new MatTableDataSource<ITurnos>(this.turnos);
  turnosFiltro:any[]=[]

  constructor( private auth:UserService, private pdf : PdfServiceService, private firestore: Firestore){}

  ngOnInit(): void {
    collectionData(collection(this.firestore,'turnos')).subscribe(data =>{
      this.dataSource=null;
      this.turnos=data.filter(x => x['paciente']==this.auth.userUsed.correo && x['estado']=="finalizado")
      this.turnosFiltro=data.filter(x => x['paciente']==this.auth.userUsed.correo && x['estado']=="finalizado")
      this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
    });

    collectionData(collection(this.firestore,'especialidades')).subscribe(data =>{
      this.especialidades=data
    });

    this.auth.conseguirUsuario().then(() => {
      console.log(this.auth.userUsed);
      this.nombre = this.auth.userUsed['nombre'];
      this.apellidos = this.auth.userUsed['apellido'];
      this.correo = this.auth.userUsed['correo'];
      this.tipo=this.auth.userUsed['tipo']
      if(this.auth.userUsed['tipo']=="user"){
        this.img = this.auth.userUsed['img1'];
        this.img2= this.auth.userUsed['img2'];
        this.imgMuesta= this.auth.userUsed['img1']
      }else{
        this.img= this.auth.userUsed['img']
        this.imgMuesta=this.auth.userUsed['img']
      }
    }); 
  }

  filtrar(){
    this.turnosFiltro=[]
    this.turnos.forEach(x =>{
      if(x['especialidad']==this.espec){
        this.turnosFiltro.push(x)
      }
    })
    console.log(this.turnosFiltro)
  }
  
  Descargar(){
    this.pdf.crearPdf(this.turnosFiltro)
    console.log(this.turnosFiltro)
  }

  cambiarImg(){
    if(this.imgMuesta == this.img){
      console.log("cambio a img 2"); 
      this.imgMuesta=this.img2}
    else {console.log("cambio a img 1"); 
    this.imgMuesta=this.img}
  }

  verificarTipo(){
    return this.auth.userUsed['tipo']=="user"
  }
}
