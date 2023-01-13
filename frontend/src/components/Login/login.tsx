import { useState, useEffect } from  'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import jsCookie from 'js-cookie';

import axios from 'axios';

const Login: React.FunctionComponent = (cookies) =>{

  const [loginMsg, setLoginMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
      if(!isLoading) setLoginMsg("")
    },[])

  const login = async(event) => {
    event.preventDefault();
    setLoginMsg('')
    const email = event.target.email.value;
    const password = event.target.password.value;
    setLoginMsg("Checking credentials...");
    setIsLoading(true);
    axios.post('http://localhost:3000/users/signin', {
      email,
      password
    })
    .then(function (response) {
      console.log(response);
      setLoginMsg("welcome back");
      setIsLoading(false);
      console.group("Cookie session")
      console.log(response.currentUser);
      console.log(response.userEmail);
      console.groupEnd()
      // navigate('/dashboard')
    })
    .catch(function (error) {
      console.log(error);
      setLoginMsg(error.response.data.message);
      setIsLoading(false);
    });
    // login(email,password);
    // console.log("hello")
  }



  
  return(
    <section>
      <div className="h-screen flex">
        <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">bEmail</h1>
            <p className="text-white mt-1">Start your day, check your email</p>
          </div>
          </div>
          <div className="flex w-1/2 justify-center items-center bg-white">
            <form className="bg-white" onSubmit={login}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome to the best email client EVER!!</h1>
              <p className="text-sm font-normal text-gray-600 mb-7">New, just register, REGULAR, you know what to do.</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input className="pl-2 outline-none border-none" type="text" name="email" id="" required placeholder="Email Address" />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input className="pl-2 outline-none border-none" type="password" name="password" id="" required placeholder="Password" />
              </div>
              <button disabled={isLoading} type="submit" className="block w-full bg-indigo-500 mt-4 py-2 rounded-md text-white font-semibold mb-2 hover:bg-indigo-600">Start your day</button>
              <Link to="#">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
              </Link>
              <div className="text-sm text-right ml-2 text-red-600">{loginMsg}</div>
            </form>
          </div>
      </div>
    </section>
  )
}
export default Login;
