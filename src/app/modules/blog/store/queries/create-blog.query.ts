import { gql } from 'apollo-angular-boost';

export const getBlogAuthors = gql`
{
  employees {
      name
      id
    }
  }
`;

export const getBlogCoe = gql`
{
    coes {
        type
        id
    }
}
`;

export const getBlogDetail = gql`
query Blog($limit: Int, $start : Int){
  featured: blogs(limit: $limit, start : $start, where: { featured: true }){
    name
    description
    thumbnail{
      id
      name
      url
      ext
    }
    categories{
      id
      category
      blogs{
        id
        name
      }
    }
    tags
    embeddedUrl
    coes{
      id
      type
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
    id
  }
  nonFeatured: blogs(limit: $limit, start : $start, where: { featured: false }){
    name
    description
    thumbnail{
      id
      name
      url
      ext
    }
    categories{
      id
      category
      blogs{
        id
        name
      }
    }
    tags
    embeddedUrl
    coes{
      id
      type
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
    id
  }
}

`;

export const getEachBlogDetail = gql`
query blog($id : ID!){
    blog(id : $id){
      name
      description
      categories{
        id
        category
        blogs{
          id
          name
        }
      }
      thumbnail{
        name
        url
        id
      }
      embeddedUrl
      coes{
        id
        type
      }
      authors{
        id
        name
      }
      tags
      id
      firstAddedOn
      
    }
  }
  
`;

export const getCategoryBlogs = gql`
query{
  categories{
    category
    blogs{
      name
      description
      tags
    }
    id
  }
}
`;

export const getCheckBoxes = gql`
query{
  categories{
    category
    id
  }
}
`;

export const getCategoryBlogsById = gql`
query($id : ID!){
  category(id : $id){
    category
    blogs{
      id
      name
      description
      tags
      embeddedUrl
      thumbnail{
        url
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
      categories{
        id
        category
      }
    }
    id
  }
}
`;

export const filterBlogs = gql`
query ($where : JSON){
  blogs(where : $where){
      name
      description
      categories{
        id
        category
        blogs{
          id
          name
        }
      }
      thumbnail{
        name
        url
        id
      }
      embeddedUrl
      coes{
        id
        type
      }
      authors{
        id
        name
      }
      tags
      id
  }
}
`;
