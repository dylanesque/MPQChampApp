import styled from 'styled-components';

export function TierWrapper({ children }) {
    return (
        <TWrapper>
            {children}
        </TWrapper>
    )
}

const TWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  overflow: auto;
`;
