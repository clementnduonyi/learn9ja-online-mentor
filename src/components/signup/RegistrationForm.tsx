
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RegistrationFormProps {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "non-binary" | "prefer-not-to-say";
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onGenderChange: (value: "male" | "female" | "non-binary" | "prefer-not-to-say") => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const RegistrationForm = ({
  name,
  email,
  password,
  gender,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onGenderChange,
  onBack,
  onSubmit,
  isSubmitting
}: RegistrationFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
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
          onChange={(e) => onEmailChange(e.target.value)}
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
          onChange={(e) => onPasswordChange(e.target.value)}
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
          onValueChange={(value) => onGenderChange(value as typeof gender)}
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
          onClick={onBack}
          className="text-sm text-learn9ja-green hover:underline"
        >
          Go back to role selection
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
