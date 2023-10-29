import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { getDownloadURL, ref, uploadBytes,Storage } from '@angular/fire/storage';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {
 
  selectedValue=""
  obra=""
  obras:any[]=[]
  especialidades:any[]=[]
  usuario=false
  especialista=true;
  files:any;
  nombre: string="";
  apellido: string="";
  dni: number=0;
  edad: number=0;
  correo: string="";
  pass: string="";
  especialidad: string="";
  constructor(private firestore: Firestore, private auth: UserService, private storage: Storage) {}
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

  onSelectChange(){
    if(this.selectedValue=="usuario"){
      this.usuario=false;
      this.especialista=true;
    }else if(this.selectedValue=="especialista"){
      this.usuario=true;
      this.especialista=false;
    }else{
      this.usuario=true;
      this.especialista=true;
    }
  }

  async newImage(event: any) {
    if(this.selectedValue=="usuario"){
     this.files= event.target.files;
     const imagenes: File[] = [];
    for (let i = 0; i < this.files.length; i++) {
      imagenes.push(this.files[i]);
    }
   console.log(imagenes);}
    else{
     this.files= event.target.files[0];
     console.log(this.files)
    }
  }

  registrar(){
    if(this.nombre!="" && this.apellido!="" && this.dni!=0 && (this.edad >18 && this.edad <100) && this.correo!="" && this.pass!=""){
      this.upload()
    }else{
      Swal.fire({
        icon:"warning",
        title:"Falto algun dato!",
        text:"Revisa bien todos los campos"
      })
    }
  }

  upload(){
    if(this.selectedValue=="usuario"){
      const filePath="imagenesUsuarios/"+ this.correo + "-1" ;
      const filePath2="imagenesUsuarios/"+ this.correo + "-2" ;
      const reffile= ref(this.storage,filePath);
     uploadBytes(reffile, this.files[0]).then(async img =>{
       const test= ref(this.storage,filePath);
       const imgf= await getDownloadURL(test);
       const reff= ref(this.storage, filePath2);
       uploadBytes(reff, this.files[1]).then(async y =>{
        const x= ref(this.storage,filePath2);
        const img2= await getDownloadURL(x)
        const imagenes={
          imagen1: imgf,
          imagen2: img2
        }
        this.guardarInfo(imagenes);
       });
     }).catch(err => console.log(err)); 
    }else{
      const filePath="imagenesUsuarios/"+ this.correo + "-1" ;
      const reffile= ref(this.storage,filePath);
     uploadBytes(reffile, this.files).then(async img =>{
       const test= ref(this.storage,filePath);
       const imgf= await getDownloadURL(test);
        this.guardarInfo(imgf);
       }).catch(err => console.log(err)); 
    }
}
async guardarInfo(imagenes: any) {
  const placeRef = collection(this.firestore,"usuarios")
  let text;
  if(this.selectedValue=="usuario")
  {
    const Data= {
    nombre: this.nombre,
    apellido: this.apellido,
    dni: this.dni,
    img1: imagenes['imagen1'],
    correo: this.correo,
    img2: imagenes['imagen2'],
    edad: this.edad,
    tipo: "user",
    obra: this.obra
  }
  addDoc(placeRef, Data)
  text="Se envio un mail de verificacion al correo: " + this.correo
}
  else if(this.selectedValue=="especialista"){
    const Data= {
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      img: imagenes,
      correo: this.correo,
      edad: this.edad,
      tipo: "especialista",
      especialidad: this.especialidad,
      habilitado:true
    }
    addDoc(placeRef, Data)
    text="Ya puede iniciar sesion"
  }else{
    const Data= {
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      img: imagenes,
      correo: this.correo,
      edad: this.edad,
      tipo: "admin",
    }
    addDoc(placeRef, Data)
    text="Ya puede iniciar sesion"
  }
  this.auth.registerSinLoguear(this.correo,this.pass,this.nombre)
  this.nombre=""
  this.apellido=""
  this.dni=0
  this.pass=""
  this.files=""
  this.edad=0;
  this.correo=""
  Swal.fire({
    icon: 'success',
    title: "El usuario se guardo ok",
    text: text
  })
}
AgregarEspecialidad(){
  if(this.especialidad=='otro'){
    Swal.fire({
      title: 'Que especialidad queres agregar?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        const x= collection(this.firestore,'especialidades');
        const data={nombre: login }
        addDoc(x,data);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon:"success",
          title:"Se agrego correctamente!"
        })
      }
    })
  }
}
}
