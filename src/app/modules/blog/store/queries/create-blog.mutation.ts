import { gql } from 'apollo-angular-boost';

export const createBlog=gql`
mutation($data : createBlogInput){
  createBlog(input : $data){
    blog{
      name
      description
      categories{
        id
        category
      }
     thumbnail{
       id
       name
     }
      tags
      authors{
        id
        name
      }
      coes{
        id
        type
      }
      embeddedUrl
      createdAt
      updatedAt
      id        
    }
  }
}
`;

export const updateBlog=gql`
mutation($data : updateBlogInput){
  updateBlog(input : $data){
    blog{
      name
      description
      categories{
        id
        category
      }
      tags
      embeddedUrl
      thumbnail{
        name
        id
      }
      coes{
        id
        type
      }
      authors{
        id
        name
      }
      id
    }
  }
}

`;

// export const thumbnail=gql`
// mutation($file: Upload!){
//   upload(file: $file){
//     name
//     hash
//     sha256
//     ext
//     mime
//     size
//     url
//     provider
//     public_id
//     public_id
//     related{
//       __typename
//     }
//     id
//   }
// }
// `;