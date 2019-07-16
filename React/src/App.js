import React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './font-montserrat.css';
import Header from './componentes/cabecalho/Header/Header';
import Main from './componentes/conteudo/Main/Main';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
