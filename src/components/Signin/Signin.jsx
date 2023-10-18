import React, { useEffect } from "react";
import { useAuth, useDbUpdate } from "../../utilities/firebase";

export const Signin = ({ cont }) => {
  const user = useAuth();
  console.log(user);

  const [update, result] = useDbUpdate(`/users/${user ? user.uid : "unknown"}`);

  useEffect(() => {
    if (user && user.uid) {
      let stored_user = {
        id: user.uid,
        photoURL: user.photoURL,
        name: user.displayName,
      };
      update(stored_user);
    }
  }, [user]);

  return (
    <div className='text-white 100vh' style={{background: 'linear-gradient(#66d9ef, #007bff)', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '91vh'}}>
        <div>
            <img src='../../../../restroomradarlogo.png'></img>
            <h1 style={{fontWeight: '700', fontSize: '3rem'}}>
                RestroomRadar
            </h1>
            <p style={{fontSize: '1rem', cursor: 'pointer'}} onClick={cont}>
                Continue as Guest
            </p>
        </div>
    </div>
  );
};
