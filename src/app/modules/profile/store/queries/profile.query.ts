import { gql } from 'apollo-angular-boost';

export const getNewAicLevels = gql`
query{
  aiclevels{
    id
    level
  }
}`;

export const getNewAicData = gql`
query ($start:Int,$limit:Int,$where:JSON){
  aiclevels(where:$where){
  employees(sort:"name",limit:$limit,start:$start){     
    id
    name
    email
    socialProfiles{
  	userId      
    }
    location{
      location
      country
      id
    }
     picture{
      id
      url

    }
  }
}
}`
export const getNewProfileData = gql`
query ($id:ID!){
  employee (id:$id){
    picture{
      url
      id
    }
    name
    coes{
      type
      id
    }
    aiclevels{
      level
      id
    }
    blogUrl
    id
    description
    skills
    education
    email
    blogs{
      id
      categories{
        id
        category
      }
      name
      description
      tags
      embeddedUrl
      thumbnail{
        id
        name
        url
        ext
      }
      authors{
        id
        name
        picture{
          id
          name
          url
        }
      }
    }
    projects{
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
      employees{
        name
        id  
        picture{
          id
          name
        }               
      }      
    }
    location{
      location
      id
    }
    socialProfiles{
      userId   
      id 
      providerId{
        id
      }
     
    }
  }
  locations{
    location
    id
  }
  coes{
    type
    id
  }
  socialprofileemployees{
    providerId{
      id
      provider
    }
    userId
    id
    
  }
  techstacks{
    type
    technologies
  }
  aiclevels{
    level
    id
  }
  
}`;


export const updateEmployee=gql`
mutation($data: updateEmployeeInput){
  updateEmployee(input: $data){
    employee{
      name
      email
      description
      education
      location{
        location
        id
      }
      aiclevels{
        id
        level
      }
      coes{
        type
        id
      }
      skills
      blogUrl
    }
  }
}
`;

export const createSocialprofileemployee = gql `
mutation($data : createSocialprofileemployeeInput){
  createSocialprofileemployee(input:$data){
    socialprofileemployee{
      providerId{
        provider
        id
      }
      userId
      id
    }
    
  }
}
`;