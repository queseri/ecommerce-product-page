import { useState } from 'react'
import './sass/style.scss';
import Header from './header/Header';
import Main from './main/Main';
import { DataProvider } from './context/Context'

function App() {
  const [overlay, setOverlay] = useState(false);

  return (
    <div className={`App ${overlay ? "show-overlay" : ""}`}>
      <DataProvider>
        <Header removeOverlay={() => setOverlay(!overlay)} />
        <Main />
      </DataProvider>
    </div>
  );
}

export default App;
