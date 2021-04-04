import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const InputStyle = css`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  font-size: 12px;
  color: black;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  ${InputStyle}
`;

export const Button = styled.input`
  ${InputStyle}

  text-align: center;
  background-color: #04aaff;
  color: white;
  margin-top: 10px;
  cursor: pointer;
`;

export const AuthError = styled.span`
  color: tomato;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
`;

export const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;
`;
