import { Injectable, Pipe } from '@angular/core';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, updateProfile} from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private auth : Auth, private firestore: Firestore) {
    }


register (email: string, password : string, displayName: string): any{
    if(email != undefined && password != undefined && displayName !=undefined){
        const varr= createUserWithEmailAndPassword(this.auth,email, password);
        varr.then((userG) =>
        updateProfile(userG.user,{
                    displayName: displayName
                })
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
        return user.displayName;
    }else{
        return 'null';
    }
}
login(email: any, password: any){
    const user = signInWithEmailAndPassword(this.auth,email,password);
    return user;
}

    logout(){
        return signOut(this.auth);
    }

}