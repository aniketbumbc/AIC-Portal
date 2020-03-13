import { gql } from 'apollo-angular-boost';

export const getProjects = gql`
  query($ProjectRequest: ProjectRequest) {
    GetProjects(data: $ProjectRequest) {
      projects {
        status
        acct_manager
        client_id
        client_name
        manager
        project_manager
        project_name
        users {
          userId
        }
        _id
        tags
      }
    }
  }
`;

export const getProjectDetail = gql`
  query($id: String!) {
    GetProjectById(id: $id) {
      error
      result {
        _id
        approved_by
        client_id
        client_name
        description
        end_date
        manager
        members {
          email
          description
          member
          project_id
          role
        }
        project_name
        start_date
        status
        tags
        techstack {
          options
          skillKey
        }
      }
    }
  }
`;

export const getProjectDetailForEdit = gql`
  query($id: String!) {
    GetProjectById(id: $id) {
      error
      result {
        active
        approved_by
        approved_on
        client_id
        client_name
        coe
        featured
        description
        end_date
        is_approved
        manager
        members {
          active
          approved_on
          email
          end_date
          description
          is_approved
          member
          project_id
          role
          start_date
          _firstAddedBy
          _firstAddedTimeStamp
          _id
          _lastUpdateBy
          _lastUpdatedTimestamp
        }
        project_docs {
                 addedby
                 addedon
                 title
                 url
               }
        project_manager
        project_name
        start_date
        status
        tags
        team_size
        techstack {
          options
          skillKey
        }
        _firstCreatedBy
        _firstCreatedTimeStamp
        _id
        _lastUpdateBy
        _lastUpdatedTimestamp
      }
    }
  }
`;

export const getTechStackSetting = gql`
query{
  GetTechStackSetting{
    result{
     color
     style
     title
     options
     skillKey
    }
  }
}
`;

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
export const UpdateProject=gql`
mutation($updated_data: UpdateProjectDataType){
  UpdateProject(projectData: $updated_data){
   error 
  }
 }
`;
export const saveProjectDocument=gql`
mutation($data:DocumentRequest){
  UploadDocument(data:$data){
   error
 }
 }
`;
export const getLocations=gql`
query{
  GetLocations{
    data{
      description
      id
    }
  }
}`;

export const Project =gql`
query Project($limit: Int, $start: Int, $sort: String){
  featured: projects(limit: $limit, start : $start, sort: $sort, where: { featured: true }){
    id
    name
    description
    status
    tags
    techstack
    client{
      name
      id
      location
    }
    members{
      designation
      employeeId{
        id
        name
        picture{
          id
        name
        url
        }
      }
    }
    employees{
      picture{
        id
        name
      }
      name
      id
    }
  }
  nonFeatured: projects(limit: $limit, start: $start, sort: $sort, where: { featured: false }){
    id
    name
    description
    status
    tags
    techstack
    client{
      name
      id
      location
    }
    members{
      designation
      employeeId{
        id
        name
        picture{
          id
        name
        url
        }
      }
    }
    employees{
      picture{
        id
        name
      }
      name
      id
    }
  }
}`

export const searchProjectData =gql`
query{
  
    projects(sort:"name"){
      name
    }
    clients(sort:"name"){
      name
    }
    employees(sort:"name"){
      name
    }
  
}`









export const ProjectDetailNew = gql`
query project($id : ID!){
  project(id : $id){
    name
    description
    status
    tags
    id
    startDate
    techstack
    endDate
    client{
      id
      name
    }
    documents{
      id
      name
      url
    }
    members{
      id
      startDate
      endDate
      designation
      employeeId{
        id
        name
        email
        picture{
          id
          name
          url
        }
        location{
          id
          location
        }
      }
    }
  }
}
`

export const allProjects = gql`
query projects{
  projects{
    name
    id
    description
    status
    tags
  }
}
`
export const techstackNew = gql`
query techstack{
  techstacks{
    type
    technologies
  }
}
`
export const allEmployees = gql`
query employees{
  employees(sort:"name"){
    name
    id
  }
}`

export const getEmployeebyName = gql`
query getEmployee($where: JSON) {
  employees(where: $where, sort:"name") {
    name
   id
  }
 }
`
export const getEmployeeDetails = gql`
query ($id:ID!){
  employee (id:$id){
    picture{
      url
      id
      name
    }
    name
    id
    email
    location{
      location
      id
    }
  }
}`


export const filterProjects = gql`
query ($where : JSON){
  projects(where : $where){
    id
    name
    description
    status
    tags
    techstack
    client{
      name
      id
      location
    }
    members{
      designation
      employeeId{
        id
        name
        picture{
          id
        name
        url
        }
      }
    }
    employees{
      picture{
        id
        name
      }
      name
      id
    }
  }
}
`;
