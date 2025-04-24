
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TeacherCardProps {
  id: string;
  name: string;
  specialization: string;
  subjects: string[];
  rating: number;
  price: number;
  avatarUrl: string;
  isAvailableNow?: boolean;
}

const TeacherCard = ({
  id,
  name,
  specialization,
  subjects,
  rating,
  price,
  avatarUrl,
  isAvailableNow = false,
}: TeacherCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover">
      <div className="relative">
        {isAvailableNow && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Available Now
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <img
              src={avatarUrl}
              alt={`${name}'s profile`}
              className="w-16 h-16 rounded-full object-cover border-2 border-learn9ja-green"
            />
            <div>
              <h3 className="font-semibold text-lg text-learn9ja-dark">{name}</h3>
              <p className="text-sm text-gray-500">{specialization}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
              <p className="text-learn9ja-green font-semibold">₦{price.toLocaleString()}/hr</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {subjects.slice(0, 3).map((subject, index) => (
                <span
                  key={index}
                  className="text-xs bg-learn9ja-green/10 text-learn9ja-green rounded-full px-2 py-1"
                >
                  {subject}
                </span>
              ))}
              {subjects.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                  +{subjects.length - 3} more
                </span>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              <Link to={`/teacher/profile/${id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </Link>
              <Link to={`/schedule/${id}`} className="flex-1">
                <Button className="w-full bg-learn9ja-green hover:bg-learn9ja-green/90">
                  Book Class
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
