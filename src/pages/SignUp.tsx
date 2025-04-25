
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SignUp = () => {
  const [role, setRole] = useState<"teacher" | "student" | null>(null);
  const [step, setStep] = useState<"role" | "details">("role");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "non-binary" | "prefer-not-to-say">("prefer-not-to-say");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role || !name || !email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      await signUp(email, password, role, name, gender);
      
      toast({
        title: "Account created!",
        description: "You have successfully signed up for Learn9ja.",
      });
      
      if (role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error creating account",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow py-16 bg-learn9ja-gray">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Create your Learn9ja account
              </CardTitle>
              <CardDescription>
                Join our community of Nigerian educators and learners.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {step === "role" ? (
                <div className="space-y-4">
                  <h3 className="text-center font-medium text-lg">I want to join as:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setRole("student");
                        setStep("details");
                      }}
                      className="p-4 border border-gray-200 rounded-lg text-center hover:border-learn9ja-green hover:bg-learn9ja-green/5 transition-all focus:outline-none focus:ring-2 focus:ring-learn9ja-green"
                    >
                      <div className="text-xl font-medium">👨‍🎓</div>
                      <div className="mt-2 font-medium">Student</div>
                      <p className="mt-1 text-xs text-gray-500">Find teachers and take classes</p>
                    </button>
                    
                    <button
                      onClick={() => {
                        setRole("teacher");
                        setStep("details");
                      }}
                      className="p-4 border border-gray-200 rounded-lg text-center hover:border-learn9ja-green hover:bg-learn9ja-green/5 transition-all focus:outline-none focus:ring-2 focus:ring-learn9ja-green"
                    >
                      <div className="text-xl font-medium">👩‍🏫</div>
                      <div className="mt-2 font-medium">Teacher</div>
                      <p className="mt-1 text-xs text-gray-500">Offer your expertise and earn</p>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={gender}
                      onValueChange={(value) => setGender(value as typeof gender)}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-binary" id="non-binary" />
                        <Label htmlFor="non-binary">Non-binary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                        <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-learn9ja-green hover:bg-learn9ja-green/90 mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                  
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("role");
                        setRole(null);
                      }}
                      className="text-sm text-learn9ja-green hover:underline"
                    >
                      Go back to role selection
                    </button>
                  </div>
                </form>
              )}
            </CardContent>

            <CardFooter className="justify-center flex-col text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-learn9ja-green font-medium hover:underline">
                  Log in
                </Link>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
