import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/recipes">Recipes</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
};
