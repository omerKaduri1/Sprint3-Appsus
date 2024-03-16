const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"

// OMER
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"

// AMIT
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"


export function RootCmp() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                
                {/* OMER */}
                <Route path="/note" element={<NoteIndex />} />
                
                
                {/* AMIT*/}
                <Route path="/mails" element={<MailIndex />} />
                <Route path="/mails/:mailId" element={<MailDetails />} />

            </Routes>
        </section>
        <AppFooter/>
    </Router>
}
