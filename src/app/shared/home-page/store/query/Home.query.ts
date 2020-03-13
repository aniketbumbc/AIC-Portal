import { gql } from 'apollo-angular-boost';

 
  export const getHomeProfilesData = gql`  
  query($data: HomeProfilesRequest) {
    GetHomeProfilesData(data: $data) {
    ProfileData{
      _id
      name
      photograph
      designation
      location
      id
    }       
  }
}`;


export const newFeaturedBlogs = gql`
query{
  blogs(where: {featured:true}){
    id
    name
   description
   authors{
     name
     id
     picture{
      url
      id
     }
   }
  }
 }`;

 export const newFeaturedProfiles = gql`
 query{
  employees(where: {featured:true}){
    id
    name
   picture{
     url
     id
   }
 location{
   location
   id
 }
  }
 }`;


 export const newFeaturedProjects = gql`
 query{
  projects(where: {featured:true}){
    id
    name
   description
   members{
     id
     employeeId{
       id
       name
       picture{
         url
         id
       }
     }
   }
  }
 }`;


 export const newPersonalBlogs = gql` 
query getEmployee($where: JSON) {
  employees(where: $where) {
    blogs{
      id
      name
     description
     authors{
       id
       name     
       picture{
         url
         id
       }
     }
    }
  }
 }`;

 export const newPersonalProjects = gql`
 query getEmployee($where: JSON) {
  employees(where: $where) {
  projects{
   id
   name
   description
   employees{
     name
     id
     picture{
       url
       id
     }
   }
 }
  }
 }`;