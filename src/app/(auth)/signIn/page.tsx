import SignInForm from "@/components/auth-ui/sign-in-form";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#60a5fa]/30 to-[#032a2a]/20 p-4">
      <SignInForm />
    </main>
  );
}
