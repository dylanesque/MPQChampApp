import styled from 'styled-components';

export function LoginPage({ children, className }) {
    return <Loginpage className={className}>{children}</Loginpage>
}

const Loginpage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 722px;
    width: 100%;
`;