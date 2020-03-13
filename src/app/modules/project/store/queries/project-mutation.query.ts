import { gql } from 'apollo-angular-boost'

export const createProject = gql`
mutation($data:createProjectInput){
    createProject(input:$data){
      project{
        name
        id
        client{
          id
          name
        }
        description
        documents{
          url
          id
        }
      }
    }
  }
`

export const createDocument = gql`
mutation($project:createProjectdocumentInput){
  createProjectdocument(input:$project){
   projectdocument{
     id
     name
     url
   }
  }
}
`
export const updateProjectDocument = gql`
mutation($input:updateProjectdocumentInput){
  updateProjectdocument(input:$input){
    projectdocument{
     id
     name
     url
    }
  }
 }
`


export const editProject = gql`
mutation updateProject($data:updateProjectInput){
  updateProject(input:$data){
    project{
      name
      id
    }
  }
}
`
export const deleteProjectDocument = gql`
mutation($data : deleteProjectdocumentInput){
  deleteProjectdocument(input : $data){
   projectdocument{
     id
   }
  }
 }
 `
export const updateProjectMember = gql`
mutation($member:updateProjectmemberInput){
  updateProjectmember(input:$member){
    projectmember{
      endDate
     startDate
     designation
     
    }
  }
 }
 
 `
