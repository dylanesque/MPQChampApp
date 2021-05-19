import gql from 'graphql-tag';
import { Button, Snackbar, IconButton } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { v4 as uuidv4 } from 'uuid';
import  Router  from 'next/router';

import { seedDB } from '../db/seed';

// Adds characters to a brand-new user lineup
export const ADD_CHAR_DB = gql`
  mutation addCharacters($objects: [characters_insert_input!]!) {
    insert_characters(objects: $objects) {
      returning {
        name
      }
    }
  }
`;

export const AddDB = (user) => {
  function reloadWindow() {
    return Router.reload(window.location.pathname);
  }
  seedDB.forEach((char) => {
    char.id = uuidv4();
    char.user_id = user.user;
  });
  const db = seedDB;

  return (
    <Mutation mutation={ADD_CHAR_DB}
      onCompleted={reloadWindow}>
      {(insert_characters, { data }) => (
        <button
          onClick={() => insert_characters({ variables: { objects: db } })}
        >
            Create Database
        </button>
      )}
    </Mutation>
  );
};

// Add new characters mutation
// Fires if the char count is less than the current length of the seed db
// In that case, creates an array of the names from the seed db
// Iterate over the user's personal lineup, and checks each name versus the array of names
// When a name is found missing, that char object gets pushed to an (initially empty) array 
// Use that array as the db for a mutation that updates that user's lineup


// Checks that the character count is what we expect it to be.
export const CHECK_CHAR_LIST = gql`
  query checkCharacters($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
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
    characters(where: { user_id: { _eq: $user_id } }, order_by: { name: asc }) {
      char_level
      feedees
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
      shards
    }
  }
`;

export const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter($id: String!, $changes: characters_set_input!) {
    update_characters_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      char_level
      power_one_level
      power_two_level
      power_three_level
      shards
    }
  }
`;


export const UpdateCharacter = ({ id, changes, user }) => {
   const [open, setOpen] = React.useState(false);

   const handleClick = () => {
     setOpen(true);
   };

   const handleClose = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }

     setOpen(false);
   };
  return (
    <>
      <Mutation
        user={user}
      mutation={UPDATE_CHARACTER}
        onCompleted={(data) => handleClick()}
        refetchQueries={() => [{query: GET_CHARACTERS, variables: { user_id: user }}]}
    >
      {(update_characters_by_pk, { data }) => (
        <button
          className="save-button"
          onClick={() =>
            update_characters_by_pk({ variables: { id, changes } })
          }
        >
          Save Changes
        </button>
      )}
    </Mutation>
     <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Character updated!"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              X
            </IconButton>
          </React.Fragment>
        }
      />
      </>
  );
};

