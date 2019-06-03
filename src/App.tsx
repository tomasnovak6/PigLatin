import * as React from 'react';

import logo from './logo.svg';
import './App.css';

interface AppProps {

}
interface AppState {

}

class App extends React.Component<AppProps, AppState> {

  render() {

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <section>

            </section>
            <footer>
              Autor: Tomáš Novák, 2019
            </footer>
        </div>
    );
  }

}

export default App;
