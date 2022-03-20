import './sass/style.scss';
import Header from './header/Header';
import Main from './main/Main';
import MainModal from './main/MainModal';
import { DataProvider } from './context/Context'

function App() { 

  return (
    <div className={`App}`}>
      <DataProvider>
        <Header  />
        <Main />
        <MainModal /> 
      </DataProvider>
    </div>
  );
}

export default App;
