import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Weekend Planner</h1>
      <nav>
        <Link to="/gateway">Getaways</Link>
        <Link to="/budget">Budget-Friendly</Link>
      </nav>
    </div>
  );
}

export default Home;