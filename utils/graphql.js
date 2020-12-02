import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { v4 as uuidv4 } from 'uuid';

import { seedDB } from '../db/seed';

export const ADD_CHAR_DB = gql`
  mutation addCharacters($objects: [characters_insert_input!]!) {
    insert_characters(objects: $objects) {
      returning {
        name
      }
    }
  }
`;

export const AddDB = () => {

  seedDB.forEach((char) => {
    char.id = uuidv4();
    char.user_id = 'auth0|5f9b45577305a20076914879';
  });
  const db = seedDB;

  return (
    <Mutation mutation={ADD_CHAR_DB}>
      {(insert_characters, { data }) => (
        <button onClick={() => insert_characters({ variables: { objects: db } })}>
          Create Database
        </button>
      )}
    </Mutation>
  );
};

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
      char_level
      feedees
      feeders
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

export const UpdateCharacter = ({ id, changes }) => {
   return (
     <Mutation mutation={UPDATE_CHARACTER}>
       {(update_characters_by_pk, { data }) => (
         <button onClick={() => update_characters_by_pk({ variables: { id, changes } })}>
           Save Changes
         </button>
       )}
     </Mutation>
   );
}

export const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter($id: String!, $changes: characters_set_input!) {
    update_characters_by_pk(pk_columns: { id: $id }, _set: $changes) {
      name
      char_level
      power_one_level
      power_two_level
      power_three_level
    }
  }
`;
