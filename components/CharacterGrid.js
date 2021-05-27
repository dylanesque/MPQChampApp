import styled from 'styled-components';

const CharacterGrid = ({ children }) => {
  return <CharGrid>{children}</CharGrid>;
};

const CharGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding-left: 1rem;
  padding-top: 3rem;
`;

export default CharacterGrid;
