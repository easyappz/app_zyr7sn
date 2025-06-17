import logo from './logo.svg';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Приложение React успешно создано! <br />
            Ждите обновлений от AI.
          </p>
        </header>
      </div>
    </ErrorBoundary>
  );
}

export default App;
