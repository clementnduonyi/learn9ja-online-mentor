
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RoleSelection from "@/components/signup/RoleSelection";
import RegistrationForm from "@/components/signup/RegistrationForm";

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

  const handleRoleSelect = (selectedRole: "teacher" | "student") => {
    setRole(selectedRole);
    setStep("details");
  };

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
                <RoleSelection onRoleSelect={handleRoleSelect} />
              ) : (
                <RegistrationForm
                  name={name}
                  email={email}
                  password={password}
                  gender={gender}
                  onNameChange={setName}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onGenderChange={setGender}
                  onBack={() => {
                    setStep("role");
                    setRole(null);
                  }}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
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
