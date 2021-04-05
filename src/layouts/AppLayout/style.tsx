import { css } from '@emotion/react';
import styled from '@emotion/styled';

const AppLayoutStyle = css`
  max-width: 890px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div<{ isLoggedIn: boolean }>`
  ${(props) => props.isLoggedIn && AppLayoutStyle}
`;
