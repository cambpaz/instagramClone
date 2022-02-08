import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebaseContext";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  //states
  const [emailAdress, setemailAdress] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');
  const isInvalid = password === '' || emailAdress === '';

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, [])

  const handleLogin = () => {

  }

  return (
    <p className="text-3xl font-bold underline">Im in the login</p>
  )
}
