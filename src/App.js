import { useState } from 'react'
import './sass/style.scss';
import Header from './header/Header';

function App() {
  const [overlay, setOverlay] = useState(false);
  return (
    <div className={`App ${overlay ? "show-overlay" : ""}`}>
      <Header removeOverlay={() => setOverlay(!overlay)} />
    </div>
  );
}

export default App;
