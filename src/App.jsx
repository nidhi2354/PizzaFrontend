import { useState } from "react";
import "./index.css";

import Home from "./Pages/Home.jsx";
import Layout from "./Layouts/Layouts.jsx";

function App() {
  return (
    <div>
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
