import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;

  input[type='text'] {
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid black;
    text-align: center;
    background-color: white;
    color: black;
  }

  input[type='submit'] {
    cursor: pointer;
    width: 100%;
    padding: 7px 20px;
    text-align: center;
    color: white;
    border-radius: 20px;
    background-color: #04aaff;
    margin-top: 10px;
  }
`;

export const ProfileForm = styled.form`
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  padding-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 7px 20px;
  text-align: center;
  color: white;
  border-radius: 20px;
  background-color: tomato;
  margin-top: 50px;
`;
