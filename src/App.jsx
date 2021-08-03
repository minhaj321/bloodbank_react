import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Display   from "./components/display.jsx";
import SimpleMap   from "./components/map.jsx";
import SignIn from './components/signIn.jsx';
import SignUp from './components/signUp.jsx';
import Chat from './components/chat.jsx';
function App() {
  return (

    <Router>
    <Route exact path='/' component={SignIn} />
    <Route path='/signup' component={SignUp} />
    <Route path='/Display' component={Display} />
    <Route path='/Map' component={SimpleMap} />
    <Route path='/chat' component={Chat} />
    </Router>
  );
}

export default App;
