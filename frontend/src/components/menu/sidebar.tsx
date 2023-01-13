import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import appIcon from '../../assets/email.png';
import composeIcon from '../../assets/compose.png';
import inboxIcon from '../../assets/inbox.png';
import logoutIcon from '../../assets/logout.png';

const SideBar = () =>{

  const navigate = useNavigate();

  //create the menu items, easier to add or remove
  const menu: MenuItem[] = [
    {
      title: 'Compose',
      url: 'compose',
      icon: composeIcon,
    },
    {
      title: 'Inbox',
      url: '/dashboard',
      icon: inboxIcon,
    },
  ];

  //TODO: create the logic for logging out user, based on what the
  //login endoint returns
  const logout = () =>{
    axios.post('http://localhost:3000/users/signout')
    .then(function (response) {
      console.log("loggin out");
      navigate('/')
    })
    .catch(function (error) {
      //TODO: redirect to login if status is 403 or to an error page
      console.log(error.response.data.message);
    });
  }

  return(
      <div className='bg-white p-5 rounded-md w-60'>
        <div className='flex justify-center'><img src={appIcon} alt="vertrical" /></div>
        <div>
          <span className='text-gray-600 font-bold'>welcome</span>
          <div className='text-indigo-400 text-sm'>phanorcoll@gmail.com</div>
        </div>
        {
          menu.map((item,i) => {
          return <Link key={i} to={item.url}><div key={item.title} className="p-2 rounded-md flex gap-2 align-middle my-4 hover:bg-indigo-200 cursor-pointer"><img src={item.icon} /> {item.title} </div></Link>
        })}
        <div className='flex gap-2 mt-14 p-2 rounded-md hover:bg-red-400 cursor-pointer' onClick={logout}>
          <img src={logoutIcon} alt="vertrical" />
          logout
        </div>
      </div>
  )    
}

export default SideBar;
