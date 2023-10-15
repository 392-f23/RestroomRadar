import React, { useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import { FirebaseSignIn, useAuth, useDbUpdate } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";



export const Signin = () => {
  const user = useAuth();
  const navigate = useNavigate();
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

      // redirecting to home
      navigate("/home")
    }
  }, [user]);

  return (
    <Stack
      gap={3}
      className="align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div
        style={{ height: 200, width: 200, backgroundColor: "#0000ff" }}
      ></div>
      <p>Welcome to</p>
      <h1>Restroom Radar</h1>
      <Button onClick={FirebaseSignIn} className="px-5">
        Sign in with Google
      </Button>
    </Stack>
  );
};
