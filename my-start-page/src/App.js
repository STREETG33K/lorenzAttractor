import React from "react";
import "./App.css";

function App() {
  return (
      <div className="start-page">
        <header>
          <h1>Welcome to my Website</h1>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="../../scripts/script.js">Projects</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <p>This is just the beginning of an awesome start page!</p>
        </main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Nicolas Asmann</p>
        </footer>
      </div>
  );
}

export default App;