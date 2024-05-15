import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int, $searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(first: $first, searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
       edges {
       cursor
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
     pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
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

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean! = true) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            createdAt
            repositoryId
            text
            user {
              id
              username
            }
            repository {
              fullName
              name
              language
              description
              ownerName
              ratingAverage
              createdAt
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
        }
      }
    }
  }
`;
