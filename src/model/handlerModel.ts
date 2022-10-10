import { Dog } from "./dogModel";

export class DogHandler{
    id:string='';
    email:string='';
    password:string='';
    name:string='';
    
    static IsItADogHandler(obj:any)
    {
        return obj.id && obj.email && obj.password && obj.name;
    }

    
}