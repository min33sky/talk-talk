import React from 'react';
import { authService, firebaseInstance } from 'fbase';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Container, SocialAuthButtons } from './style';
import { useAuthState } from 'contexts/auth';
import { Redirect } from 'react-router-dom';

/**
 * 인증 페이지
 * URL: /auth
 */
export default function Auth() {
  const { currentUser } = useAuthState();

  const onClickGoogle = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  const onClickGithub = async () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    await authService.signInWithPopup(provider);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

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
