import gql from 'graphql-tag';

export const ADD_CHAR_DB = gql`
  mutation addCharacters($objects: [characters_insert_input!]!) {
    insert_characters(objects: $objects) {
      returning {
        name
      }
    }
  }
`;

export const CHECK_CHAR_LIST = gql`
  query checkCharacters($id: String!) {
    users(where: { id: { _eq: $id } }) {
      characters_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;


export const GET_CHARACTERS = gql`
  query GetCharacters($user_id: String!) {
    characters(where: { user_id: { _eq: $user_id } }) {
      char_id
      char_level
      feedee_id
      feeder_id
      id
      image
      name
      power_one_color
      power_one_level
      power_three_color
      rarity
      power_two_level
      power_two_color
      power_three_level
    }
  }
`;
