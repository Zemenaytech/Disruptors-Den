"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleSignIn = async () => {
    try {
      const result = await signIn("credentials", {
        email: "abel@gmail.com",
        password: "12345678",
        redirect: false, // Prevents automatic redirects
      });
      console.log(result);
      if (result?.ok) setLoggedIn(true);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };
  if (loggedIn) return <div>logged in</div>;
  return (
    <div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Admin;
