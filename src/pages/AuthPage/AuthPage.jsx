import './AuthPage.css'
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm";
import {useState} from 'react'


export default function AuthPage({setUser}) {
  const [showForms, setShowForms] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  
  const toggleForms = () => {
    setShowLogin(!showLogin);
  };

  return (
    <main className="LandingPage">
      <div className='Header'>
        <h1 className="Title">WORK-HUB</h1>
        <h1 className="Slogan">Your All-in-one<br></br>Sales Hub</h1>
      </div>
      {showForms ? (
        <div className='Forms'>
          <button className='FormSwapBtn' onClick={toggleForms}>
            {showLogin ? 'SIGN UP' : 'LOG IN'}
          </button>
          {showLogin ? (
            <LoginForm setUser={setUser} />
            ) : (
            <SignUpForm setUser={setUser} />
          )}
        </div>
      ) : (
        <button className='ShowForms' onClick={() => setShowForms(true)}>LOG IN</button>
      )}
    </main>
  );
}