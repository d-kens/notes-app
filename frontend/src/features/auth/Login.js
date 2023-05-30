import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";


const Login = () => {

  const userRef = useRef();
  const errRef = useRef();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errMsg, setErrorMsg ] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrorMsg('');
  }, [username, password])

 

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if(!err.status) {
        setErrorMsg('no server response');
      } else if (err.status === 400) {
        setErrorMsg('missing username or password')
      } else if (err.status === 401) {
        setErrorMsg('unauthorized')
      } else {
        setErrorMsg(err.data?.message)
      }
      errRef.current.focus();
    }
  }

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <p>Loading...</p>



  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass}>{errMsg}</p>
        <form className="form" onSubmit={ handleSubmit } >
          <label>Username: </label>
          <input 
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label>Password: </label>
          <input 
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <button className="form__submit-button">Sign In</button>
        </form>
      </main>
      <footer>
        <Link to="/">Back to home </Link>
      </footer>
    </section>
  )


  return content;
}

export default Login