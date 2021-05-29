import styled from 'styled-components';
import { Card, CircularProgress } from '@material-ui/core';

export function LoadingPage() {
  return (
    <Loadingpage>
      <LoadingCard>
          <CircularProgress />
          <LoadingText>Loading...</LoadingText>
          </LoadingCard>
    </Loadingpage>
  );
}

const Loadingpage = styled.div`
  height: 655px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const LoadingCard = styled(Card)`
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 72px 80px;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  display: inline-block;
  padding-right: 8px;
`;
