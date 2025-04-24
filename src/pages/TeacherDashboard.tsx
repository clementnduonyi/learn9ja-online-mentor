
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { Calendar } from "lucide-react";

// Sample class requests
const classRequests = [
  {
    id: "r1",
    studentName: "Olajumoke Adenuga",
    studentAvatar: "https://randomuser.me/api/portraits/women/62.jpg",
    subject: "Mathematics",
    topic: "Calculus - Integration",
    requestDate: "2025-05-01T14:00:00Z",
    duration: 60,
    status: "pending"
  },
  {
    id: "r2",
    studentName: "Emmanuel Okocha",
    studentAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
    subject: "Physics",
    topic: "Electromagnetism",
    requestDate: "2025-05-03T16:30:00Z",
    duration: 90,
    status: "pending"
  }
];

// Sample upcoming classes
const upcomingClasses = [
  {
    id: "c1",
    studentName: "Chioma Eze",
    studentAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    subject: "Mathematics",
    topic: "Algebra - Quadratic Equations",
    classDate: "2025-05-01T09:00:00Z",
    duration: 60
  },
  {
    id: "c2",
    studentName: "Tunde Johnson",
    studentAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    subject: "Physics",
    topic: "Mechanics - Newton's Laws",
    classDate: "2025-05-02T15:30:00Z",
    duration: 45
  }
];

// Sample earnings data
const earningsData = {
  currentMonth: 45000,
  previousMonth: 38000,
  totalStudents: 12,
  totalClasses: 34,
  totalHours: 51
};

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAvailableForInstant, setIsAvailableForInstant] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in and is a teacher
    if (!user) {
      navigate("/login");
    } else if (user.role !== "teacher") {
      navigate("/student/dashboard");
    }
  }, [user, navigate]);

  const handleAvailabilityChange = () => {
    setIsAvailableForInstant(!isAvailableForInstant);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-NG', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16 bg-learn9ja-gray">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-learn9ja-dark">
                Welcome back, {user.name || "Teacher"}!
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your classes, students, and earnings.
              </p>
            </div>
            
            <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="mr-3">
                <Switch 
                  checked={isAvailableForInstant}
                  onCheckedChange={handleAvailabilityChange}
                  className={isAvailableForInstant ? "bg-green-500" : ""}
                />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {isAvailableForInstant ? "Available for instant classes" : "Unavailable for instant classes"}
                </p>
                <p className="text-xs text-gray-500">
                  {isAvailableForInstant 
                    ? "Students can book you for immediate sessions" 
                    : "Only scheduled classes allowed"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Class Requests</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  {classRequests.length > 0 ? (
                    <div className="space-y-4">
                      {classRequests.map(request => (
                        <div 
                          key={request.id}
                          className="flex flex-col md:flex-row md:items-center p-4 border border-gray-100 rounded-lg bg-white shadow-sm"
                        >
                          <img 
                            src={request.studentAvatar} 
                            alt={request.studentName}
                            className="w-12 h-12 rounded-full mr-4 mb-3 md:mb-0"
                          />
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <h4 className="font-medium text-learn9ja-dark">{request.subject}: {request.topic}</h4>
                                <p className="text-sm text-gray-500">from {request.studentName}</p>
                              </div>
                              <div className="mt-2 md:mt-0 text-sm">
                                <p className="text-learn9ja-green">{formatDate(request.requestDate)}</p>
                                <p className="text-gray-500">{request.duration} minutes</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3 md:mt-0 md:ml-4">
                            <Button size="sm" className="bg-learn9ja-green hover:bg-learn9ja-green/90">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No pending class requests.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingClasses.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingClasses.map(cls => (
                        <div 
                          key={cls.id}
                          className="flex flex-col md:flex-row md:items-center p-4 border border-gray-100 rounded-lg bg-white shadow-sm"
                        >
                          <div className="flex items-center mb-3 md:mb-0">
                            <Calendar className="h-10 w-10 text-learn9ja-green mr-2" />
                            <div className="border-r border-gray-200 pr-4 mr-4">
                              <p className="font-semibold text-learn9ja-green">{formatDate(cls.classDate)}</p>
                              <p className="text-xs text-gray-500">{cls.duration} min</p>
                            </div>
                            <img 
                              src={cls.studentAvatar} 
                              alt={cls.studentName}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-learn9ja-dark">{cls.subject}: {cls.topic}</h4>
                            <p className="text-sm text-gray-500">with {cls.studentName}</p>
                          </div>
                          
                          <Button className="mt-3 md:mt-0 md:ml-4 bg-learn9ja-green hover:bg-learn9ja-green/90">
                            Start Class
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No upcoming classes scheduled.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">This Month</p>
                      <p className="text-3xl font-bold text-learn9ja-dark">₦{earningsData.currentMonth.toLocaleString()}</p>
                      <p className="text-xs text-green-500 mt-1">
                        +{Math.round((earningsData.currentMonth - earningsData.previousMonth) / earningsData.previousMonth * 100)}% from last month
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Students</p>
                        <p className="text-xl font-semibold">{earningsData.totalStudents}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Classes</p>
                        <p className="text-xl font-semibold">{earningsData.totalClasses}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hours</p>
                        <p className="text-xl font-semibold">{earningsData.totalHours}</p>
                      </div>
                    </div>
                    
                    <Button className="w-full">View Detailed Earnings</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg border ${user.isPremium ? 'border-learn9ja-green bg-learn9ja-green/5' : 'border-gray-200'}`}>
                    <h3 className="font-semibold">
                      {user.isPremium ? 'Premium Plan' : 'Basic Plan'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {user.isPremium 
                        ? 'Access to all premium features including instant classes' 
                        : 'Limited features available'}
                    </p>
                    <Button 
                      className={`mt-3 w-full ${user.isPremium ? 'bg-learn9ja-green hover:bg-learn9ja-green/90' : ''}`}
                      variant={user.isPremium ? 'default' : 'outline'}
                      onClick={() => navigate("/pricing")}
                    >
                      {user.isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teaching Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="week">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="week" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Completion Rate</p>
                          <p className="text-2xl font-bold">98%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Avg Rating</p>
                          <p className="text-2xl font-bold">4.9</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bookings</p>
                          <p className="text-2xl font-bold">7</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="month" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Completion Rate</p>
                          <p className="text-2xl font-bold">96%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Avg Rating</p>
                          <p className="text-2xl font-bold">4.8</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bookings</p>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="year" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Completion Rate</p>
                          <p className="text-2xl font-bold">97%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Avg Rating</p>
                          <p className="text-2xl font-bold">4.7</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bookings</p>
                          <p className="text-2xl font-bold">186</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
