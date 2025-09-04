import gql from "graphql-tag";

export const GET_USER_QUERY = gql`
  query GetUser($id: ID, $username: String) {
    user(id: $id, username: $username) {
      _id
      username
      link {
        _id
        name
        url
      }
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

export const DELETE_LINK_MUTATION = gql`
  mutation DeleteLink($userId: ID!, $id: ID!) {
    deleteLink(userId: $userId, id: $id)
  }
`;