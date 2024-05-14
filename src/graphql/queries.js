import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GetRepositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
       edges {
       node {
         id
         name
         ownerName
         createdAt
         fullName
         reviewCount
         ratingAverage
         forksCount
         stargazersCount
         description
         language
         ownerAvatarUrl
       }
     }
    }
  }
`;

export const ME = gql`
 query Me {
    me {
      id
      username
    }
 }
`;

export const GET_REPOSITORY = gql`
 query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            rating
            text
            createdAt
            user {
              username
            }
          }
        }
      }
    }
 }
`;

