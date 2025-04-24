
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  forTeacher?: boolean;
}

const PricingCard = ({
  title,
  price,
  features,
  isPopular = false,
  forTeacher = false,
}: PricingCardProps) => {
  const { user } = useAuth();
  
  const isUserTypeMatch = user 
    ? (forTeacher ? user.role === 'teacher' : user.role === 'student') 
    : true;
  
  return (
    <div className={`
      relative bg-white rounded-xl border p-6 md:p-8
      ${isPopular 
        ? 'border-learn9ja-green shadow-md shadow-learn9ja-green/10' 
        : 'border-gray-200 shadow-sm'
      }
    `}>
      {isPopular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <span className="bg-learn9ja-green text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <h3 className={`text-xl font-semibold ${isPopular ? 'text-learn9ja-green' : 'text-learn9ja-dark'}`}>
        {title}
      </h3>
      
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold">₦{price.toLocaleString()}</span>
        <span className="ml-1 text-gray-500 text-sm">/month</span>
      </div>
      
      <p className="mt-2 text-sm text-gray-500">
        {forTeacher 
          ? "For teachers who want to expand their reach" 
          : "For students who want enhanced learning"
        }
      </p>
      
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-learn9ja-green flex-shrink-0 mr-2" />
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8">
        {isUserTypeMatch ? (
          <Button 
            className={`w-full ${isPopular ? 'bg-learn9ja-green hover:bg-learn9ja-green/90' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {user?.isPremium ? 'Current Plan' : 'Subscribe Now'}
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full">
            {forTeacher ? 'For Teachers Only' : 'For Students Only'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
