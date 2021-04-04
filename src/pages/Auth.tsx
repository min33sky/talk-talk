import React from 'react';
import { authService, firebaseInstance } from 'fbase';
import AuthForm from 'components/AuthForm';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SocialAuthButtons = styled.div`
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

/**
 * 인증 페이지
 * URL: /auth
 */
export default function Auth() {
  const onClickGoogle = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  const onClickGithub = async () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    await authService.signInWithPopup(provider);
  };

  return (
    <Container>
      <FontAwesomeIcon icon={faTwitter} color="#04aaff" size="3x" style={{ marginBottom: 30 }} />
      <AuthForm />
      <SocialAuthButtons>
        <button name="google" onClick={onClickGoogle}>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onClickGithub}>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </SocialAuthButtons>
    </Container>
  );
}
