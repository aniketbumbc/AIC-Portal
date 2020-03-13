import { gql } from 'apollo-angular-boost';

export const getProfileDetail = gql`
query($slug: String!){
  GetProfileBySlug(slug: $slug){
    id
    blogUrl    
    name
    email
    photograph
    profileStatus
    designation
    education
    github
    introduction
    coe
    description
    layout
    location
    related{
      _id
      title
      tagline
      access
      categories
      description
      thumbnail
      embedUrl
      id
    }
    layers{
      skillKey
      title
      color
      style
      options
    }
    user{
      email
      role
      authorized_role
    }
  }
}`;



export const getExportProfileData = gql`
query($slug: String!){
  GetExportProfileBySlug(slug: $slug){
   error
   profile
  }
}`;
