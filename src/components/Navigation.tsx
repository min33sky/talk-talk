import React from 'react';
import { useAuthState } from 'contexts/auth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

/**
 * 상단 네비게이션
 * @returns Navigation Component
 */
export default function Navigation() {
  const { currentUser } = useAuthState();

  return (
    <nav>
      <ul style={ulStyle}>
        <li>
          <Link to="/" style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={faTwitter} color="#04AAFF" size="2x" />
          </Link>
        </li>

        <li>
          <Link to="/profile" style={liStyle}>
            <FontAwesomeIcon icon={faUser} color="#04AAFF" size="2x" />
            <span style={{ marginTop: '10px' }}>
              {currentUser?.displayName ? currentUser.displayName : currentUser?.email}의 Profile
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const ulStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
};

const liStyle = {
  marginLeft: 10,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  fontSize: 12,
};
