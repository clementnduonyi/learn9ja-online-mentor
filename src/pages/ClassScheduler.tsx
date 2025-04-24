
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";

// Sample teacher data
const teachers = {
  t1: {
    id: "t1",
    name: "Adebayo Ogunlesi",
    specialization: "Mathematics & Physics",
    subjects: ["Mathematics", "Physics", "Further Mathematics"],
    rating: 4.9,
    price: 5000,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    isAvailableNow: true
  },
  t2: {
    id: "t2",
    name: "Ngozi Okonjo",
    specialization: "Economics & Business Studies",
    subjects: ["Economics", "Business Studies", "Commerce"],
    rating: 4.8,
    price: 5500,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    isAvailableNow: false
  },
  t3: {
    id: "t3",
    name: "Chinedu Eze",
    specialization: "Computer Science & ICT",
    subjects: ["Computer Science", "ICT", "Programming"],
    rating: 4.7,
    price: 6000,
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    isAvailableNow: true
  },
};

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  subjects: string[];
  rating: number;
  price: number;
  avatarUrl: string;
  isAvailableNow: boolean;
}

const ClassScheduler = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("60");
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (teacherId && teachers[teacherId as keyof typeof teachers]) {
      setTeacher(teachers[teacherId as keyof typeof teachers]);
    }
  }, [teacherId, user, navigate]);

  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleScheduleClass = () => {
    if (!selectedDate || !selectedTime || !subject || !topic) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);
    
    // In a real app, this would make an API call to Supabase
    setTimeout(() => {
      toast({
        title: "Class Scheduled!",
        description: `Your class with ${teacher?.name} has been requested.`,
      });
      setIsScheduling(false);
      navigate("/student/dashboard");
    }, 1500);
  };

  const handleInstantClass = () => {
    if (!teacher?.isAvailableNow) {
      toast({
        title: "Teacher unavailable",
        description: "This teacher is not available for instant classes right now.",
        variant: "destructive",
      });
      return;
    }

    if (!subject || !topic) {
      toast({
        title: "Missing information",
        description: "Please specify a subject and topic for the class.",
        variant: "destructive",
      });
      return;
    }

    setIsScheduling(true);
    
    // In a real app, this would make an API call to Supabase
    setTimeout(() => {
      toast({
        title: "Instant Class Requested!",
        description: `Connecting you with ${teacher?.name} for an instant class.`,
      });
      setIsScheduling(false);
      navigate("/student/dashboard");
    }, 1500);
  };

  if (!teacher && teacherId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-24 pb-16 bg-learn9ja-gray">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-learn9ja-dark mb-4">Teacher not found</h1>
            <p className="text-gray-600 mb-6">The teacher you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/student/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16 bg-learn9ja-gray">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-learn9ja-dark">
              Schedule a Class
              {teacher && ` with ${teacher.name}`}
            </h1>
            <p className="mt-2 text-gray-600">
              Choose between scheduling a future class or starting an instant session.
            </p>
          </div>

          {teacher && (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 lg:w-1/4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <img 
                        src={teacher.avatarUrl} 
                        alt={teacher.name}
                        className="w-24 h-24 rounded-full border-2 border-learn9ja-green mb-4"
                      />
                      <h2 className="font-semibold text-xl">{teacher.name}</h2>
                      <p className="text-gray-500 mb-2">{teacher.specialization}</p>
                      
                      <div className="flex items-center mb-4">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-medium">{teacher.rating.toFixed(1)}</span>
                      </div>
                      
                      <p className="text-learn9ja-green font-bold text-xl">₦{teacher.price.toLocaleString()}/hr</p>
                      
                      {teacher.isAvailableNow && (
                        <div className="mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          Available for instant classes
                        </div>
                      )}
                      
                      <div className="mt-4 w-full">
                        <h3 className="font-medium text-left mb-2">Subjects</h3>
                        <div className="flex flex-wrap gap-2">
                          {teacher.subjects.map((subject, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-learn9ja-green/10 text-learn9ja-green rounded-full px-2 py-1"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:w-2/3 lg:w-3/4">
                <Card>
                  <CardHeader>
                    <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="schedule">Schedule a Class</TabsTrigger>
                        <TabsTrigger value="instant" disabled={!teacher.isAvailableNow}>
                          Instant Class
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="schedule" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-3">1. Select Date</h3>
                          <div className="border rounded-md">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 30))}
                              className="rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">2. Select Time</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {availableTimes.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`p-2 rounded-md text-center ${
                                  selectedTime === time
                                    ? 'bg-learn9ja-green text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">3. Class Details</h3>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2"
                          >
                            <option value="">Select a subject</option>
                            {teacher.subjects.map((subj, index) => (
                              <option key={index} value={subj}>{subj}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Topic
                          </label>
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Algebra, Calculus, Chemical Bonding"
                            className="w-full rounded-md border border-gray-300 p-2"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                          </label>
                          <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2"
                          >
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">4. Price</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span>Class fee</span>
                            <span>₦{(teacher.price * (parseInt(duration) / 60)).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Platform fee</span>
                            <span>₦{(teacher.price * 0.05 * (parseInt(duration) / 60)).toLocaleString()}</span>
                          </div>
                          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₦{(teacher.price * 1.05 * (parseInt(duration) / 60)).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleScheduleClass} 
                        disabled={isScheduling}
                        className="w-full bg-learn9ja-green hover:bg-learn9ja-green/90"
                      >
                        {isScheduling ? "Scheduling..." : "Schedule Class"}
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="instant" className="space-y-6">
                      <div className="p-4 border border-green-200 bg-green-50 rounded-md">
                        <p className="font-medium text-green-800">
                          {teacher.name} is available for an instant class right now!
                        </p>
                        <p className="text-sm text-green-700 mt-1">
                          You can start a session immediately after providing class details.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Class Details</h3>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2"
                          >
                            <option value="">Select a subject</option>
                            {teacher.subjects.map((subj, index) => (
                              <option key={index} value={subj}>{subj}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Topic
                          </label>
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Algebra, Calculus, Chemical Bonding"
                            className="w-full rounded-md border border-gray-300 p-2"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estimated Duration
                          </label>
                          <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2"
                          >
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Price</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm text-gray-500 mb-2">
                            You'll be charged based on the actual duration of the class.
                          </p>
                          <div className="flex justify-between mb-2">
                            <span>Rate per hour</span>
                            <span>₦{teacher.price.toLocaleString()}</span>
                          </div>
                          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                            <span>Estimated total (for {duration} min)</span>
                            <span>₦{(teacher.price * 1.05 * (parseInt(duration) / 60)).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleInstantClass} 
                        disabled={isScheduling}
                        className="w-full bg-learn9ja-green hover:bg-learn9ja-green/90"
                      >
                        {isScheduling ? "Processing..." : "Start Instant Class"}
                      </Button>
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClassScheduler;
