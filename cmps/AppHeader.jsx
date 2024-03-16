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
      <nav className="flex align-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">
          <div className="img-container">
            <img
              className="img-container"
              src="assets/img/gmail-icon.png"
              alt="Gmail"
              title="Gmail"
            />
          </div>
        </NavLink>
        <NavLink to="/note">

          <div className="img-container">
            <img
              src="assets/img/google-keep-icon.webp"
              alt="GoogleKeep"
              title="GoogleKeep"
            />
          </div>
        </NavLink>
      </nav>
    </header>
  )
}
