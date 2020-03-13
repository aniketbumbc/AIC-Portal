import { gql } from 'apollo-angular-boost';

export const getSearch = gql`
query($SearchRequest: SearchRequest ) {
  GetSearch(data:$SearchRequest){
    demos{
      thumbnail
      title
      description
      id
      categories
    }
    profiles{
      id
      name
      location
      designation
      introduction
      photograph
    }
    projects{
      active
      client_name
      project_name
      manager
      status
      tags
      users{
        userId
      }
      _id
    }
  }
}`;

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
