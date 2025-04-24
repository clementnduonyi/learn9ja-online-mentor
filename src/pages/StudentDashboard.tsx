
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SearchTeachers from "@/components/SearchTeachers";
import TeacherCard from "@/components/TeacherCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

// Sample teacher data
const teachers = [
  {
    id: "t1",
    name: "Adebayo Ogunlesi",
    specialization: "Mathematics & Physics",
    subjects: ["Mathematics", "Physics", "Further Mathematics"],
    rating: 4.9,
    price: 5000,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    isAvailableNow: true
  },
  {
    id: "t2",
    name: "Ngozi Okonjo",
    specialization: "Economics & Business Studies",
    subjects: ["Economics", "Business Studies", "Commerce"],
    rating: 4.8,
    price: 5500,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    isAvailableNow: false
  },
  {
    id: "t3",
    name: "Chinedu Eze",
    specialization: "Computer Science & ICT",
    subjects: ["Computer Science", "ICT", "Programming"],
    rating: 4.7,
    price: 6000,
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    isAvailableNow: true
  },
  {
    id: "t4",
    name: "Funke Akindele",
    specialization: "English & Literature",
    subjects: ["English", "Literature", "Creative Writing"],
    rating: 4.9,
    price: 5200,
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    isAvailableNow: false
  },
  {
    id: "t5",
    name: "Oluwaseun Adeleke",
    specialization: "Biology & Chemistry",
    subjects: ["Biology", "Chemistry", "Agricultural Science"],
    rating: 4.6,
    price: 4800,
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    isAvailableNow: true
  }
];

// Sample upcoming classes
const upcomingClasses = [
  {
    id: "c1",
    subject: "Advanced Calculus",
    teacherName: "Adebayo Ogunlesi",
    teacherAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "2025-05-02T10:00:00Z",
    duration: 60
  },
  {
    id: "c2",
    subject: "English Grammar",
    teacherName: "Funke Akindele",
    teacherAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    date: "2025-05-05T15:30:00Z",
    duration: 45
  }
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  
  useEffect(() => {
    // Check if user is logged in and is a student
    if (!user) {
      navigate("/login");
    } else if (user.role !== "student") {
      navigate("/teacher/dashboard");
    }
  }, [user, navigate]);

  const handleSearch = (filters: any) => {
    console.log("Searching with filters:", filters);
    
    // Simple client-side filtering (in a real app, this would be API calls to Supabase)
    let filtered = [...teachers];
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(
        teacher => 
          teacher.name.toLowerCase().includes(query) || 
          teacher.specialization.toLowerCase().includes(query)
      );
    }
    
    if (filters.subject) {
      filtered = filtered.filter(
        teacher => teacher.subjects.includes(filters.subject)
      );
    }
    
    if (filters.availableNow) {
      filtered = filtered.filter(teacher => teacher.isAvailableNow);
    }
    
    setFilteredTeachers(filtered);
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-learn9ja-dark">
              Welcome back, {user.name || "Student"}!
            </h1>
            <p className="mt-2 text-gray-600">
              Find teachers, schedule classes, and track your learning progress.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Find Teachers</CardTitle>
                </CardHeader>
                <CardContent>
                  <SearchTeachers onSearch={handleSearch} />
                </CardContent>
              </Card>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-learn9ja-dark mb-6">Available Teachers</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map(teacher => (
                      <TeacherCard
                        key={teacher.id}
                        id={teacher.id}
                        name={teacher.name}
                        specialization={teacher.specialization}
                        subjects={teacher.subjects}
                        rating={teacher.rating}
                        price={teacher.price}
                        avatarUrl={teacher.avatarUrl}
                        isAvailableNow={teacher.isAvailableNow}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-gray-500">No teachers found matching your criteria.</p>
                      <Button 
                        variant="link" 
                        className="text-learn9ja-green mt-2"
                        onClick={() => setFilteredTeachers(teachers)}
                      >
                        Reset filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
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
                          className="flex items-center p-3 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow transition-all"
                        >
                          <img 
                            src={cls.teacherAvatar} 
                            alt={cls.teacherName}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-learn9ja-dark">{cls.subject}</h4>
                            <p className="text-sm text-gray-500">with {cls.teacherName}</p>
                            <p className="text-xs text-learn9ja-green mt-1">{formatDate(cls.date)}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No upcoming classes scheduled.</p>
                      <Button 
                        variant="link" 
                        className="text-learn9ja-green mt-2"
                        onClick={() => navigate("/")}
                      >
                        Find teachers
                      </Button>
                    </div>
                  )}
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
                        ? 'Access to all premium features' 
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
                  <CardTitle>Learning Statistics</CardTitle>
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
                          <p className="text-sm text-gray-500">Total Classes</p>
                          <p className="text-2xl font-bold">3</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Hours Learned</p>
                          <p className="text-2xl font-bold">4.5</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Subjects</p>
                          <p className="text-2xl font-bold">2</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="month" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Total Classes</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Hours Learned</p>
                          <p className="text-2xl font-bold">18</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Subjects</p>
                          <p className="text-2xl font-bold">4</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="year" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Total Classes</p>
                          <p className="text-2xl font-bold">64</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Hours Learned</p>
                          <p className="text-2xl font-bold">96</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Subjects</p>
                          <p className="text-2xl font-bold">7</p>
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

export default StudentDashboard;
