import{Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name:'name'})
export class UserNamePipe implements PipeTransform{
transform(value:any):any{
    if(!value) return '';
    if(value){
       return value.replace('-', ' ').replace('_', ' ');
    }
}
}