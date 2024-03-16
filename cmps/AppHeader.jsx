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
      <nav className = "nav-bar flex">
        <NavLink to="/mail">
            <img
              src="assets/img/gmail-icon.png"
              alt="Gmail"
              title="Gmail"
            />
        </NavLink>
        <NavLink to="/note">

            <img
              src="assets/img/google-keep-icon.webp"
              alt="GoogleKeep"
              title="GoogleKeep"
            />
        </NavLink>
      </nav>
    </header>
  )
}
