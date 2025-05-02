import gql from "graphql-tag";

export const GET_LINKS_QUERY = gql`
  query Query ($id: ID!) {
    user(id: $id) {
      username
      link {
        _id
        name
        url
      }
    }
  }
`

export const UPDATE_LINK_MUTATION = gql`
  mutation UpdateLink($id: ID!, $name: String!, $url: String!) {
    updateLink(id: $id, name: $name, url: $url) {
      _id
      name
      url
    }
  }
`