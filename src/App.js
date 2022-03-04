import { useState } from 'react'
import './sass/style.scss';
import Header from './header/Header';
import Main from './main/Main';

function App() {
  const [overlay, setOverlay] = useState(false);
 
  return (
    <div className={`App ${overlay ? "show-overlay" : ""}`}>
      <Header removeOverlay={() => setOverlay(!overlay)} />
      <Main />
    </div>
  );
}

export default App;
