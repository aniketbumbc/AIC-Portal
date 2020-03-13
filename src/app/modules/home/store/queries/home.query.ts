import { gql } from 'apollo-angular-boost';

export const getProfile = gql`
  query($PeopleRequest: PeopleRequest) {
    GetUpdatedProfiles(data: $PeopleRequest) {
      aiclevels {
        id
        description
      }
      designations{
        description
        id
      }
      profiles {
        id
        name
        location
        designation
        photograph
        desgDesc
        _lastUpdatedTimestamp
      }
    }
  }
`;
export const getBlog = gql`
  query($DemoRequest: DemoRequest) {
    GetDemos(data: $DemoRequest) {
      demos {
        id
        _id
        title
        tagline
        access
        categories
        description
        thumbnail
        author {
          authorName
        }
        embedUrl
      }
    }
  }
`;
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
export const getFetchDetails = gql`
query{
  GetFetchDetails {
    clients
    {
      _id
      name
    }
    managers{
      managerName
      managerEmail
    }
  	projectManagers{
      Pm_Name
    	Pm_Email
    }
    roles{
      description
      id
      bench_ignore
    }
    status{
      name
      value
    }
    users{
      id
      name
    }
    realName {
      id
      name
      photograph
   }
  }
}`;
