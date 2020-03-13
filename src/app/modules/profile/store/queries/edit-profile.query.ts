import { gql } from 'apollo-angular-boost';


export const getDetailsForEditProfile = gql`
query($slug: String!){
  GetProfileBySlug(slug: $slug){
    id
    centreofexcellence
    locations{
      id
      description
    }
    aiclevels{
      id
      description
    }
    designations{
      bench_ignore
      description
      id
    }
    github
    name
    email
    photograph
    profileStatus
    aiclevel
    designation
    education
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
    techstack{
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
    blogUrl
  }
}`;


export const saveProfile=gql`
mutation($data: DataRequest){
  GetUpdatedProfileResponse(data: $data){
    error
    message
  }
}`;

export const updateProfilePhoto=gql`
mutation($data:UpdatedForPhotoRequest){
  UpdateProfilePhoto(data:$data){
    error
    fileurl
  }
}
`;

export const deleteProfilePhoto=gql`
mutation($slug:String!){
  DeleteProfilePhoto(slug:$slug){
    error
  }
}
`;

