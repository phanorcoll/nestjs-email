import { Link } from 'react-router-dom';

const Dashboard: React.FunctionComponent = () =>{
  return(
    <section>
      <div>This is DASHBOARD</div>
      <Link to='/'>back to home</Link>
    </section>
  )
}

export default Dashboard;
