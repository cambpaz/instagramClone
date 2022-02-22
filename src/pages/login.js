import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebaseContext";
import iphone from '../assets/iphone-with-profile.jpeg';
import logo from '../assets/logo.png';
import * as ROUTES from '../constants/routes'

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  //states
  const [emailAdress, setEmailAdress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAdress === '';

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAdress, password); //this changed on version 9
      history.push(ROUTES.DASHBOARD)
    } catch (error) {
      setEmailAdress('');
      setPassword('');
      setError(error.message)
    }
  }

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/6">
        <img src={iphone} alt="phone" />
      </div>
      <div className="flex flex-col justify-center items-center rounded ">
        <div className="flex bg-white p-6 border-gray-primary border flex-col w-4/5">
          <h1 className="flex justify-center w-full">
            <img src={logo} alt="logo" />
          </h1>
          {
            error && <p className="mb-4 text-xs text-red-primary">{error}</p>
          }
          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email"
              type="email"
              placeholder="Email adress"
              className="text-sm text-gray-base w-full border mt-3 h-2 py-5 px-4 border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAdress(target.value)}
              value={emailAdress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full border mt-3 h-2 py-5 px-4 border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 mt-3 font-bold ${isInvalid && 'opacity-50'}`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-4/5 mt-5 bg-white p-4 border border-gray-primary">
          <p>Don't have an account? {` `} <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium"> Sign up</Link></p>
        </div>
      </div>

    </div >
  )
}
