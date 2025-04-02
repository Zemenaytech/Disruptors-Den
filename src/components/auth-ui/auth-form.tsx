"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#032a2a]">
          {activeTab === "signin"
            ? "Sign in to your account"
            : "Create an account"}
        </h1>
        <p className="text-sm text-[#c4c4c6]">
          {activeTab === "signin"
            ? "Enter your credentials to access your account"
            : "Fill in your details to create a new account"}
        </p>
      </div>

      <Tabs
        defaultValue="signin"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger
            value="signin"
            className="data-[state=active]:bg-[#eab308]/10 data-[state=active]:text-[#032a2a]"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-[#eab308]/10 data-[state=active]:text-[#032a2a]"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-signin" className="text-[#032a2a]">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email-signin"
                placeholder="name@example.com"
                type="email"
                className="bg-[#c4c4c6]/10 border-[#c4c4c6]/20 focus-visible:ring-[#eab308]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password-signin" className="text-[#032a2a]">
                Password
              </Label>
              <a href="#" className="text-xs text-[#60a5fa] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password-signin"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-[#c4c4c6]/10 border-[#c4c4c6]/20 focus-visible:ring-[#eab308]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c4c4c6]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <Button className="w-full bg-[#032a2a] hover:bg-[#032a2a]/90">
            Sign In
          </Button>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name" className="text-[#032a2a]">
                First Name
              </Label>
              <Input
                id="first-name"
                placeholder="John"
                className="bg-[#c4c4c6]/10 border-[#c4c4c6]/20 focus-visible:ring-[#eab308]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name" className="text-[#032a2a]">
                Last Name
              </Label>
              <Input
                id="last-name"
                placeholder="Doe"
                className="bg-[#c4c4c6]/10 border-[#c4c4c6]/20 focus-visible:ring-[#eab308]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email-signup" className="text-[#032a2a]">
              Email
            </Label>
            <Input
              id="email-signup"
              placeholder="name@example.com"
              type="email"
              className="bg-[#c4c4c6]/10 border-[#c4c4c6]/20 focus-visible:ring-[#eab308]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password-signup" className="text-[#032a2a]">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password-signup"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-[#c4c4c6]/10 border-[#c4c4c6]/20 focus-visible:ring-[#eab308]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c4c4c6]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-[#032a2a]">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-[#c4c4c6]/10 border-[#c4c4c6]/20 focus-visible:ring-[#eab308]"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c4c4c6]"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <Button className="w-full bg-[#032a2a] hover:bg-[#032a2a]/90">
            Create Account
          </Button>
        </TabsContent>
      </Tabs>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#c4c4c6]/20"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-[#c4c4c6]">Or continue with</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-[#c4c4c6]/20 hover:bg-[#c4c4c6]/5"
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Sign in with Google
      </Button>
    </div>
  );
}
