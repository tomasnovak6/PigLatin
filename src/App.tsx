import * as React from 'react';

import logo from './logo.svg';
import './App.css';
import PigLatin from './components/PigLatin/PigLatin';

class App extends React.Component {

  render() {
      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
              </header>
              <section>
                <PigLatin />
              </section>
              <footer>Autor: Tomáš Novák, 2019</footer>
          </div>
      );
  }

}

export default App;
