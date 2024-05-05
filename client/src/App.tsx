import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <span>Main content</span>
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <span>Search page</span>
              </Layout>
            }
          />

          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          <Route
            path="/sign-in"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />

          <Route path="*" element={<span>not found</span>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
