import styled from 'styled-components';
import { Card } from '@material-ui/core';

export function ReportChar({ children }) {
    return (
        <Reportchar>
            {children}
        </Reportchar>
    )
}

const Reportchar = styled(Card)`
  display: flex;
  flex-direction: column;
  min-width: 240px;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.25rem;
`;
