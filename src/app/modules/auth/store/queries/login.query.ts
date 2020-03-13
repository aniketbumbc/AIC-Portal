import { gql } from 'apollo-angular-boost';

export const loginApi = gql`
mutation ($data: LoginInformationRequest) {
  Login(data: $data) {
    data
    responseDesc
    decoded{
      id
      authorized_role
      email
      role
    }
  }
}`;

export const forgetPasswordApi=gql`
mutation($username:String!){
  ForgetPassword(username:$username){
    error
    data
    responseDesc
  }
}`;
export const requestForAccessApi=gql`
mutation($username:String!){
  CheckLocalUser(username:$username){
    error
    flag
    message
    responseDesc
    data{
      profileStatus
      id
      _id
      email
      aiclevel
    }
  }
}`;