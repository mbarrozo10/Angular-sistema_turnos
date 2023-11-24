import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, getFirestore, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {
  usuarios:any[]=[]
  admins:any[]=[]
  especialistas:any[]=[]
  listaUsuarios:any[]=[]
  usuariosExportar:any[]=[]
  selectedValue="usuario"
  p:any;
  alternar:boolean=true;

    ngOnInit(): void {
      const place= collection(this.firestore,'usuarios');
      collectionData(place).subscribe(data =>
        {
          this.usuariosExportar = data
          this.usuarios=[]
          this.admins = []
          this.especialistas = []
          data.forEach(x => {
            switch(x['tipo']){
              case 'user':
                this.usuarios.push(x)
                break;
              case 'admin':
                this.admins.push(x)
                break;
              case 'especialista':
                this.especialistas.push(x)
                // this.p();
                break;
            } 
          });
          this.onSelectChange()
          console.log(this.usuariosExportar);
        })
      };
    constructor(private firestore: Firestore, private excel: ExcelService){
      
    }

    onSelectChange(){
      console.log(this.selectedValue);
      switch(this.selectedValue){
        case 'usuario':
          this.listaUsuarios=this.usuarios;
          this.alternar=true;
          break;
        case 'admin':
          this.listaUsuarios=this.admins
          this.alternar=true;

          break;
        case 'especialista':
          this.alternar=false;
          break;
      }
    }

    cambiarEstado(x:any){
      Swal.fire({
        icon:"warning",
        title:"Estas seguro que queres cambiar el estado?",
        showCancelButton:true,
        cancelButtonText:"No",
        confirmButtonText:"Si!"
      }).then((result) => {
        if (result.isConfirmed) {
          let borrables:any []=[]
          const t= collection(this.firestore, 'usuarios');
          let q= query(t,where("correo", "==",x['correo'])) ;
          this.p= onSnapshot(q, (snapshot)=>{
            console.log(snapshot.docs);
            snapshot.docs.forEach((x) =>{
             borrables.push(x.id);
            })
            console.log(borrables)
            const db= getFirestore();
            const data={
              habilitado:!x['habilitado']
            }
               const docref= doc(db,"usuarios",borrables[0]);
               updateDoc(docref,data)
           })
          Swal.fire('Se cambio!', '', 'success').then(()=>{this.p()})
        } else if (result.dismiss) {
          Swal.fire('No se cambio nada!', '', 'info')}
        })
   
    }
    Descargar(){
      this.excel.generateReportWithDict(this.usuariosExportar, 'bkp')
    }
     
}
