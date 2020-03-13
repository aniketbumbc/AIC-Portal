import { Injectable } from "@angular/core";
import { gql } from 'apollo-angular-boost';
import { Apollo, QueryRef } from 'apollo-angular';

@Injectable({ providedIn: 'root' })

export class MyProfileServices {

    constructor(
        private _apollo: Apollo
    ) { }
    employeeDetail(params): QueryRef<any> {
        return this._apollo.use('client2').watchQuery({
            query: gql`query($where:JSON){
                employees(where:$where){
                  id
                }
              }`,
            variables: params
        })
    }
}