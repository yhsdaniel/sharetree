import gql from "graphql-tag";

export const GET_USER_QUERY = gql`
  query GetUser($id: ID, $username: String) {
    user(id: $id, username: $username) {
      _id
      username
      theme
      link {
        _id
        name
        url
      }
    }
  }
`;

export const UPDATE_USER_THEME = gql`
  mutation UpdateTheme($id: ID!, $theme: String!) {
    updateTheme(id: $id, theme: $theme) {
      _id
      theme
    }
  }
`;

export const CREATE_USER_NEW = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLink($name: String!, $url: String!) {
    createLink(name: $name, url: $url) {
      _id
      name
      url
    }
  }
`;

export const UPDATE_LINK_MUTATION = gql`
  mutation UpdateLink($id: ID!, $name: String!, $url: String!) {
    updateLink(id: $id, name: $name, url: $url) {
      _id
      name
      url
    }
  }
`;

export const UPDATE_LINK_ORDER_MUTATION = gql`
  mutation UpdateLinkOrder($userId: ID!, $orderedIds: [ID!]!) {
    updateLinkOrder(userId: $userId, orderedIds: $orderedIds) {
      success
      links{
        _id
        name
        url
      }
    }
  }
`;

export const DELETE_LINK_MUTATION = gql`
  mutation DeleteLink($userId: ID!, $id: ID!) {
    deleteLink(userId: $userId, id: $id)
  }
`;