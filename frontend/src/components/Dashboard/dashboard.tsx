import { Link, useNavigate } from 'react-router-dom';
import appIcon from '../../assets/email.png';
import composeIcon from '../../assets/compose.png';
import inboxIcon from '../../assets/inbox.png';
import logoutIcon from '../../assets/logout.png';
import rightArrow from '../../assets/arrow.png';
import { demoData } from './demoData.js';
import { format } from 'date-fns';

interface MenuItem {
  title: string;
  url: string;
  icon: string;
}

interface Email{
  to: string,
  from: string,
  receivedDate: string,
  read: boolean,
  deleted: boolean,
  draft: boolean,
  body: string,
}

const Dashboard: React.FunctionComponent = () => {
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
      url: 'inbox',
      icon: inboxIcon,
    },
  ];

  //TODO: create the logic for logging out user, based on what the
  //login endoint returns
  const logout = () =>{
    console.log("loggin out");
    navigate("/");
  }

  const truncateBody = (body:string, limit:number) =>{
    return body.substring(0, limit);
  }

  return (
    <section className='flex gap-5 m-5'>
      <div className='bg-white p-5 rounded-md w-60'>
        <div className='flex justify-center'><img src={appIcon} alt="vertrical" /></div>
        <div>
          <span className='text-gray-600 font-bold'>welcome</span>
          <div className='text-indigo-400 text-sm'>phanorcoll@gmail.com</div>
        </div>
        {
          menu.map(item => {
          return <div key={item.title} className="p-2 rounded-md flex gap-2 align-middle my-4 hover:bg-indigo-200 cursor-pointer"><img src={item.icon} /> {item.title} </div>
        })}
        <div className='flex gap-2 mt-14 p-2 rounded-md hover:bg-red-400 cursor-pointer' onClick={logout}>
          <img src={logoutIcon} alt="vertrical" />
          logout
        </div>
      </div>
      <div className='bg-white p-5 rounded-md'>
        {demoData.map((email, i) => {
          return(
            <div key={i} className={`p-3 mb-2 rounded-md flex gap-5 cursor-pointer ${email.read ? 'bg-gray-200' : 'bg-gray-50'} hover:bg-gray-200`}>
              <div className='inline-block'><img src={rightArrow} alt="vertrical" /></div>
              <div className={`${email.read ? 'font-normal':'font-bold'}`}>{email.from}</div>
              <div className='flex gap-2 align-bottom'>
                <div className={`${email.read ? 'font-normal':'font-bold'}`}>{truncateBody(email.subject, 100)}</div>
                <div>-</div>
                <div className='text-sm text-gray-500'>{truncateBody(email.body, 50)}...</div>
                <div className='text-sm text-gray-600 font-bold'>{format(new Date(email.receivedDate), 'dd/mm/yyyy')}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Dashboard;
