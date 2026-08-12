const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { NoteList } from './apps/note/cmps/NoteList.jsx'
import { NoteTrash } from './apps/note/cmps/NoteTrash.jsx'

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />} />
          <Route path="/note" element={<NoteIndex />}>
            <Route index element={<NoteList />} />
            <Route path="home" element={<NoteList />} />
            <Route path="trash" element={<NoteTrash />} />
          </Route>
        </Routes>
        <UserMsg />
      </section>
    </Router>
  )
}
