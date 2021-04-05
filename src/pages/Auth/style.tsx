import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const SocialAuthButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;

  button {
    cursor: pointer;
    border-radius: 20px;
    border: none;
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
    width: 150px;
    background-color: white;
  }
`;
