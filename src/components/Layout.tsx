import React from 'react';

import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <h1>This is the header</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <h1>This is the footer</h1>
      </footer>
    </div>
  );
};

export default Layout;
