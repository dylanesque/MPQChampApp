import styled from 'styled-components';

export function CenterCard({ children }) {
  return <Centercard>{children}</Centercard>;
}

const Centercard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
