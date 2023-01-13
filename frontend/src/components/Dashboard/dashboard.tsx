import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../menu/sidebar';
import rightArrow from '../../assets/arrow.png';
import { format } from 'date-fns';
import axios from 'axios';

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

  const [emails, setEmails] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/emails')
    .then(function (response) {
      setEmails(response.data);
    })
    .catch(function (error) {
      //TODO: redirect to login if status is 403 or to an error page
      console.log(error.response.data.message);
    });
    }, [])

  const navigate = useNavigate();

  const truncateBody = (body:string, limit:number) =>{
    return body?.substring(0, limit);
  }

  return (
    <section className='flex gap-5 m-5'>
      <SideBar />
      <div className='bg-white p-5 rounded-md w-5/12'>
        {emails ? emails.map((email, i) => {
          return(
            <Link key={i} to={`/dashboard/email/${email._id}`}>
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
            </Link>
          )
        }) : 'loading'}
      </div>
    </section>
  )
}

export default Dashboard;
