import Login from './components/Login/login';
import { Link } from  'react-router-dom';

const App: React.FunctionComponent = () => {
  return (
    <section>
      <Login />
      <Link to='/dashboard'> Go to Dashboard</Link>
    </section>
  )
}

export default App
