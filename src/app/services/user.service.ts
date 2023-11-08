import { Injectable, Pipe } from '@angular/core';
import {getAuth, Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, updateProfile,sendEmailVerification,signInWithCredential} from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root'
})

export class UserService {
    public userUsed:any
    constructor(private auth : Auth, private firestore: Firestore, private auth2: Auth) {
    }


register (email: string, password : string, displayName: string): any{
    if(email != undefined && password != undefined && displayName !=undefined){
        const varr= createUserWithEmailAndPassword(this.auth,email, password);
        varr.then((userG) =>
      {  updateProfile(userG.user,{
                    displayName: displayName
                })
                this.verificarCorreo(userG.user);
              }
        ).catch((error) => {    
                return "retorno";
            });
            
        return varr;
    }else{
        return Error;
    }
}
registerSinLoguear (email: string, password : string, displayName: string): any{

    const correo=this.auth.currentUser?.email;
    if(email != undefined && password != undefined && displayName !=undefined){
        const varr= createUserWithEmailAndPassword(this.auth2,email, password);
        varr.then((userG) =>
      {  updateProfile(userG.user,{
                    displayName: displayName
                })
                this.verificarCorreo(userG.user);   
                 this.login(correo,"hola123")
              }
        ).catch((error) => {    
                return "retorno";
            });
            
        return varr;
    }else{
        return Error;
    }
} 
retornarUsuario(){
    const user= this.auth.currentUser;
    if(user != null){
        return user.email;
    }else{
        return 'null';
    }
}
async login(email: any, password: any){
    const user =  signInWithEmailAndPassword(this.auth,email,password);
    user.then(() => {
        this.conseguirUsuario()
    })
    return user;
}

logout(){
    return signOut(this.auth);
}

async verificarCorreo(user: any){ {
    if(this.auth.currentUser != null)
    sendEmailVerification(user)
    }
}

async conseguirUsuario(){
    return new Promise((resolve, reject) => {
        const placeRef = collection(this.firestore, "usuarios");
        const unsubscribe = collectionData(placeRef).subscribe((data) => {
          data.forEach((x) => {
            if (this.auth.currentUser?.email == x['correo']) {
              this.userUsed = x;
              console.log(this.auth.currentUser);
              resolve(x);
            }
          });
          reject('Error'); 
        });
      });
}
}