import SignUpForm from "@/components/auth-ui/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#60a5fa]/30 to-[#032a2a]/20 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#eab308]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#60a5fa]/10 rounded-full blur-3xl"></div>
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}
