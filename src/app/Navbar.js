import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1 className="text-center">Butterfly 🦋</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
