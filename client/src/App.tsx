import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";

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
          <Route path="*" element={<span>not found</span>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
