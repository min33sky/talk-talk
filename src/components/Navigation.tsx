import { useAuthState } from 'contexts/auth';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const { currentUser } = useAuthState();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {currentUser?.displayName ? currentUser.displayName : currentUser?.email}의 Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
