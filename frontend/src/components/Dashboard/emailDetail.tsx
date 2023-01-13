import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import SideBar from '../menu/sidebar';
import Loading from '../../assets/loading.png';

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

const EmailDetail: React.FunctionComponent = (props) => {
  let {id} = useParams();

  const [emailData, setEmailData] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:3000/emails/${id}`)
    .then(function (response) {
      setEmailData(response.data)
      setLoading(false);
    })
    .catch(function (error) {
      //TODO: redirect to login if status is 403 or to an error page
      console.log(error.response.data.message);
    });
    }, [])

  return (
    <section className='flex gap-5 m-5'>
      <SideBar />
      <div className='bg-white p-5 rounded-md w-5/12'>
        {
          loading ? (
            <div className='flex align-middle justify-center'>
              <img src={Loading} />
            </div>
          ):(
            <div>
            <div className='flex gap-7 mb-5 text-sm text-gray-600'>
              <div>from: {emailData?.from} </div>
              <div>received: {emailData.receivedDate}</div>
            </div>
            <div>{emailData.body}</div>
            </div>
          )
        }
      </div>
    </section>
  )
}

export default EmailDetail
