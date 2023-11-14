import React from 'react';

const profileButton = () => {
  return (
    <div className="profile">
      <button className="button" type="button">
        <p>Stephen V.</p>
      </button>
    </div>
  );
};

function Header() {
  return (
    <nav id="header">
      {/* Navigation content */}
      {profileButton()}
    </nav>
  );
}

export default Header;
