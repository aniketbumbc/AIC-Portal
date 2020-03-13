import { gql } from 'apollo-angular-boost';

export const clients = gql`query{
clients(sort:"name"){
 id
 name
accountManagers{
name
id
}
location
description
}
employees(sort:"name"){
  name
  id
}
}`

export const getClient = gql`
query clients($id : ID!){
      client(id : $id){
      id
      name
      accountManagers{
        name
        id
      }
      logo{
        name
        url
        id
      }
      location
       active
      description
    }
  }`

export const updateClient = gql`
  mutation($data : updateClientInput){
    updateClient(input : $data){
      client{
        name
        location
        accountManagers{
          name
          id
        }
        active
        description
      }
    }
  }
  `;
export const searchACM = gql`
 
query employee($where : JSON){
  employees(where:$where){
    name
    id
  }
 }
 
  `;

  export const getAccountManagers = gql`
 
query{
  employees{
    name
    id
  }
 }
 
  `;
export const createClient = gql`
  mutation($data:createClientInput){
      createClient(input:$data){
        client{
          name
          description
          active
          location
          accountManagers{
            id
            name
          }
          createdAt
          updatedAt
          _id
          id
        }
      }
    }`;

  export const clientName = gql`
  query getClientName($where: JSON) {
    clients(where: $where) {
      name
      id
    }
   }
   
  `  

