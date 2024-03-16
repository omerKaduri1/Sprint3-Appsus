const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/">
        <img
          src="assets/img/Appsus-icon.png"
          alt="logo"
          className="logo"
          title="website-logo"
        />
      </Link>
      <nav className = "nav-bar flex">
        <NavLink to="/mail">
            <img
              className="mail-logo"
              src="assets/img/gmail-icon.png"
              alt="Gmail"
              title="Gmail"
            />
        </NavLink>
        <NavLink to="/note">

            <img
            className="keep-logo"
              src="assets/img/google-keep-icon.webp"
              alt="GoogleKeep"
              title="GoogleKeep"
            />
        </NavLink>
      </nav>
    </header>
  )
}
