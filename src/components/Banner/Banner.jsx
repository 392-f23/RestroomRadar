import Navbar from 'react-bootstrap/Navbar';
import { FirebaseSignIn, FirebaseSignOut, useAuth } from '../../utilities/firebase';
import './Banner.css'

const SignInButton = () => (
  <button className="my-2 mx-4 btn text-white signinbutton" style={{border: '1px solid white', borderRadius: '2rem'}} onClick={FirebaseSignIn}>Sign in</button>
);

const SignOutButton = () => (
  <button className="my-2 mx-4 btn text-white" style={{border: '1px solid white', borderRadius: '2rem'}} onClick={FirebaseSignOut}>Sign out</button>
);

const AuthButton = () => {
  const [user] = useAuth();
  return user ? <SignOutButton /> : <SignInButton />;
};

function Banner({title}) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary banner-container">
      <h1 className=' mx-4 header'>{title}</h1>
      <AuthButton />     
    </Navbar>
  );
}

export default Banner;