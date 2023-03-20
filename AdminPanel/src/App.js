import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import UserList from "./pages/list/UserList";
import TeamList from "./pages/list/TeamList";
import TeamSingle from "./pages/single/TeamSingle";
import TeamNew from "./pages/new/TeamNew";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompetitionList from "./pages/list/CompetitionList";
import CompetitionSingle from "./pages/single/CompetitionSingle";
import CompetitionNew from "./pages/new/CompetitionNew";
import BookList from "./pages/list/BookList";
import BookNew from "./pages/new/Book";
import BookSingle from "./pages/single/BookSingle";
import EmailNew from "./pages/new/Email";
import Banner from "./pages/list/BannerList";
import BannerNew from "./pages/new/Banner";
import BannerSingle from "./pages/single/BannerSingle";
import WriterSingle from "./pages/single/WriterSingle";
import WriterList from "./pages/list/WriterList";
import WriterNew from "./pages/new/WriterNew";
import View from "./pages/single/View";

function App() {

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<UserList />} />
              {/* <Route path=":userId" element={<Single />} /> */}
            </Route>
            <Route path="teams">
              <Route index element={<TeamList />} />
              <Route path="single/:teamid" element={<TeamSingle />} />
              <Route
                path="new"
                element={<TeamNew />}
              />
            </Route>
            <Route path="competitions">
              <Route index element={<CompetitionList />} />
              <Route path="single/:teamid" element={<CompetitionSingle />} />
              <Route
                path="new"
                element={<CompetitionNew />}
              />
            </Route>
            <Route path="books">
              <Route index element={<BookList />} />
              <Route path="single/:bookId" element={<BookSingle />} />
              <Route
                path="new"
                element={<BookNew />}
              />
            </Route>
            <Route path="banner">
              <Route index element={<Banner />} />
              <Route path="single/:bannerId" element={<BannerSingle />} />
              <Route
                path="new"
                element={<BannerNew />}
              />
            </Route>
            <Route path="writer">
              <Route index element={<WriterList />} />
              <Route path="single/:writer" element={<WriterSingle />} />
              <Route
                path="new"
                element={<WriterNew />}
              />
              <Route
                path="view/:id"
                element={<View />}
              />
            </Route>
            <Route path="email">
              <Route
                index
                element={<EmailNew />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
