import * as React from 'react';

import 'antd/dist/antd.css';
import './App.css';
import PigLatin from './components/PigLatin/PigLatin';

class App extends React.Component {

  render() {
      return (
          <div className="App">
              <div className="container-fluid">
                  <header className="App-header">
                      <h1>Front-End Task for Sapho (Citrix)</h1>
                  </header>
                  <section className="App-content">
                      <PigLatin />
                  </section>
                  <footer className="App-footer">
                      <div className="row">Author: Tomáš Novák, 2019</div>
                  </footer>
              </div>
          </div>
      );
  }

}

export default App;
