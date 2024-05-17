import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
       accessToken
    }
  } 
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: ID!) {
    deleteReview(id: $reviewId) 
  }
`;