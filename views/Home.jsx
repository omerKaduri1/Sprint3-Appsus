const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home flex column align-center justify-center">
      <h2 className="headline animate__animated animate__backInLeft">
        Stay Organized and Connected, <br />
        Your All-in-One Workspace with Appsus.
      </h2>

      <h2 className="animate__animated animate__backInRight">Our Features</h2>
      <section className="features flex align-center animate__animated animate__backInRight">
        <article className="feature-preview flex column align-center">
          <Link to="/mails">
            <img
              src="assets/img/gmail-icon-home.png"
              alt="gmail-icon"
              title="gmail-icon"
            />
          </Link>
          <h2>Appsus emails</h2>
          <Link to="/mails">
            <button title="go to mails">Try</button>
          </Link>
        </article>

        <article className="feature-preview flex column align-center">
          <Link to="/note">
            <img
              src="assets/img/google-keep-icon.webp"
              alt="google-keep-icon"
              title="google-keep-icon"
            />
          </Link>
          <h2>Appsus keep</h2>
          <Link to="/note">
            <button title="go to keep">Try</button>
          </Link>
        </article>
      </section>

      <section className="about-us flex column align-center">
        <h2>Our Team</h2>

        <article className="team">
          <img src="assets/img/amit.jpg" alt="Amit Frid" title="Amit Frid" />
          <h3>Amit Frid</h3>
          <p>
            Enthusiastic Industrial engineering & Fullstack development student{" "}
            <br />
            with great problem-solving skills and passion for learning. <br />
          </p>
          <a
            href="https://github.com/amitfrid7"
            target="_blank"
            title="go to github"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </article>

        <article className="team">
          <img
            src="assets/img/omer.jpg"
            alt="Omer Kaduri"
            title="Omer Kaduri"
          />
          <h3>Omer Kaduri</h3>
          <p>
            27 years old from Herzliya, israel. <br />
            Fullstack development student in Coding Academy.
          </p>
          <a
            href="https://github.com/omerKaduri1"
            target="_blank"
            title="go to github"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </article>
      </section>
    </section>
  )
}
