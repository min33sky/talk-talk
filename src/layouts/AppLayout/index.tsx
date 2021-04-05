import React from 'react';
import { Container } from './style';

interface IProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

export const AppLayout = ({ isLoggedIn, children }: IProps) => {
  return <Container isLoggedIn={isLoggedIn}>{children}</Container>;
};
