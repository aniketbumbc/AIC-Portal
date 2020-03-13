import { gql } from 'apollo-angular-boost';
export const getFetchDetails = gql`
         query {
           GetFetchDetails {
             clients {
               _id
               name
             }
             managers {
               managerName
               managerEmail
             }
             projectManagers {
               Pm_Name
               Pm_Email
             }
             roles {
               description
               id
               bench_ignore
             }
             status {
               name
               value
             }
             users {
               id
               name
             }
             realName {
                id
                name
                photograph
             }
           }
         }
 `;
 export const newMemberRequest=gql`
 mutation($data:ResourceRequest){
  NewResourceRequest(data:$data){
    role
    location
    projectName
    _id
    _v
		skillset
    createdAt
    updatedAt
    id
    position
    raisedByName
    requestNumber
    raisedByEmail
  }   
}
 `;