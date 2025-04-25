
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface RoleSelectionProps {
  onRoleSelect: (role: "teacher" | "student") => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-center font-medium text-lg">I want to join as:</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onRoleSelect("student")}
          className="p-4 border border-gray-200 rounded-lg text-center hover:border-learn9ja-green hover:bg-learn9ja-green/5 transition-all focus:outline-none focus:ring-2 focus:ring-learn9ja-green"
        >
          <div className="text-xl font-medium">👨‍🎓</div>
          <div className="mt-2 font-medium">Student</div>
          <p className="mt-1 text-xs text-gray-500">Find teachers and take classes</p>
        </button>
        
        <button
          onClick={() => onRoleSelect("teacher")}
          className="p-4 border border-gray-200 rounded-lg text-center hover:border-learn9ja-green hover:bg-learn9ja-green/5 transition-all focus:outline-none focus:ring-2 focus:ring-learn9ja-green"
        >
          <div className="text-xl font-medium">👩‍🏫</div>
          <div className="mt-2 font-medium">Teacher</div>
          <p className="mt-1 text-xs text-gray-500">Offer your expertise and earn</p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
