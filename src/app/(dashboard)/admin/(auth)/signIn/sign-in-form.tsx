"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const onSubmit = async () => {
    const signInData = await signIn("credentials", {
      email: "abel@gmail.com",
      password: "12345678",
      redirect: false,
    });

    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      console.log("logged in");
      router.push("/admin");
    }
  };

  return (
    <div>
      <div>SignInForm</div>
      <button onClick={onSubmit}>signIn</button>
    </div>
  );
}
