import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebaseContext";
import iphone from '../assets/iphone-with-profile.jpeg';
import logo from '../assets/logo.png';
import doesUsernameExist from '../services/firebase'
import * as ROUTES from '../constants/routes';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  //states
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAdress, setEmailAdress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAdress === '';

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, [])

  const handleSignUp = async (event) => {
    event.preventDefault();

    const userNameExists = await doesUsernameExist(username);
    
    //si el username me devuelve 1, es que ya existe, por ende queremos que cuando no exista lo cree
    if (!userNameExists) {
      try {
        //IN HERE WE WANT TO CREATE THE USER NAME W PASSWORD
        const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAdress, password);
        //authentication
        await createdUserResult.user.updateProfile({
          displayName: username
        })
        //agregamos al user a nuestra collection
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAdress: emailAdress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now()
        })

        history.push(ROUTES.DASHBOARD)
      } catch (error) {
        setFullName('');
        setEmailAdress('');
        setPassword('');
        setUsername('');
        setError('Username already taken. Please try another one.')

      }
    } else {
      setUsername('');
      setError('Username already taken. Please try another one.')
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
          <form onSubmit={handleSignUp} method="POST">
          <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full border mt-3 h-2 py-5 px-4 border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full border mt-3 h-2 py-5 px-4 border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email"
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
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-4/5 mt-5 bg-white p-4 border border-gray-primary">
          <p>Have an account? {` `} <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium"> Login</Link></p>
        </div>
      </div>
    </div >
  )
}

