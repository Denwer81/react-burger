import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import './App.css';

function App() {
  const [current, setCurrent] = React.useState('one')
  
  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', flexDirection: 'row'}} >
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        начинки
      </Tab>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


