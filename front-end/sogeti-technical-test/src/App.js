import logo from './logo.svg';
import './App.scss';
import useFetch from './hooks/useFetch';
import { useEffect } from 'react';
import Todo from './components/todo';

function App() {
  const [r, e] = useFetch("http://localjhost:3001/todos");
  useEffect(()=>{
    //console.log(e);
  }, [e])
  return (
    <div className="App">
      {
        r?.map(todo => <Todo title={todo.title}/>)
      }
    </div>
  );
}

export default App;
