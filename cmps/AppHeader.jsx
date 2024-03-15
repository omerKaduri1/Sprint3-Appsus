const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/">
        <img
          src="assets/img/logo.png"
          alt="logo"
          className="logo"
          title="website-logo"
        />
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">
          <img
            src="assets/img/gmail-icon.png"
            alt="gmail icon"
            title="gmail icon"
          />
        </NavLink>
        <NavLink to="/note">
          <img
            src="assets/img/google-keep-icon.webp"
            alt="google keep icon"
            title="google keep icon"
          />
        </NavLink>
      </nav>
    </header>
  )
}
