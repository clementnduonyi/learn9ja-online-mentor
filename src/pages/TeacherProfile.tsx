
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample teacher data
const teachers = {
  t1: {
    id: "t1",
    name: "Adebayo Ogunlesi",
    specialization: "Mathematics & Physics Teacher",
    location: "Lagos, Nigeria",
    subjects: ["Mathematics", "Physics", "Further Mathematics"],
    education: [
      "BSc Mathematics, University of Lagos",
      "PGDE, National Teachers Institute",
      "MSc Applied Mathematics, University of Ibadan"
    ],
    experience: "8 years of teaching experience in secondary and tertiary levels",
    bio: "I am a passionate mathematics and physics teacher with 8 years of experience. I specialize in breaking down complex concepts into simple, easy-to-understand lessons tailored to each student's learning style. My students consistently achieve top grades in WAEC, NECO, and JAMB examinations.",
    rating: 4.9,
    totalReviews: 124,
    totalStudents: 256,
    totalClasses: 1240,
    price: 5000,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    isAvailableNow: true,
    reviews: [
      {
        id: "r1",
        studentName: "Chioma Eze",
        studentAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
        rating: 5,
        comment: "Mr. Adebayo is an exceptional teacher! He helped me understand calculus concepts that I had struggled with for months. Highly recommended!",
        date: "2025-04-15"
      },
      {
        id: "r2",
        studentName: "Tunde Johnson",
        studentAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
        rating: 5,
        comment: "I improved my physics grade from C to A after just one month of classes with Mr. Adebayo. His teaching method is clear and effective.",
        date: "2025-04-10"
      },
      {
        id: "r3",
        studentName: "Amina Ibrahim",
        studentAvatar: "https://randomuser.me/api/portraits/women/58.jpg",
        rating: 4,
        comment: "Very knowledgeable teacher with a lot of patience. He's helped me prepare for my JAMB exams and I'm feeling confident.",
        date: "2025-04-02"
      }
    ]
  },
  t2: {
    id: "t2",
    name: "Ngozi Okonjo",
    specialization: "Economics & Business Studies Teacher",
    location: "Abuja, Nigeria",
    subjects: ["Economics", "Business Studies", "Commerce"],
    education: [
      "BSc Economics, University of Nigeria, Nsukka",
      "MBA, Lagos Business School"
    ],
    experience: "12 years teaching experience with 5 years as head of department",
    bio: "I have a passion for teaching economics and business studies with real-world applications. My background includes working in banking before transitioning to teaching full-time. I focus on practical examples and case studies to make abstract economic concepts relatable to students.",
    rating: 4.8,
    totalReviews: 98,
    totalStudents: 187,
    totalClasses: 950,
    price: 5500,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    isAvailableNow: false,
    reviews: [
      {
        id: "r1",
        studentName: "Emeka Okafor",
        studentAvatar: "https://randomuser.me/api/portraits/men/78.jpg",
        rating: 5,
        comment: "Mrs. Ngozi is amazing! Her real-world examples made economics so much easier to understand. My grades have improved significantly.",
        date: "2025-04-12"
      },
      {
        id: "r2",
        studentName: "Fatima Suleiman",
        studentAvatar: "https://randomuser.me/api/portraits/women/62.jpg",
        rating: 4,
        comment: "Very patient teacher who takes time to explain difficult concepts. She's helped me prepare well for my WASSCE Economics exam.",
        date: "2025-04-05"
      }
    ]
  },
  t3: {
    id: "t3",
    name: "Chinedu Eze",
    specialization: "Computer Science & ICT Teacher",
    location: "Port Harcourt, Nigeria",
    subjects: ["Computer Science", "ICT", "Programming"],
    education: [
      "BSc Computer Science, Covenant University",
      "MSc Information Systems, University of Lagos",
      "Certified Programming Instructor"
    ],
    experience: "6 years of teaching programming and computer science",
    bio: "I am a computer science educator with extensive experience in software development and teaching programming languages. I specialize in Python, Java, and web development. My teaching approach combines theory with plenty of practical exercises to ensure students build real-world skills.",
    rating: 4.7,
    totalReviews: 76,
    totalStudents: 134,
    totalClasses: 620,
    price: 6000,
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    isAvailableNow: true,
    reviews: [
      {
        id: "r1",
        studentName: "Joy Adebayo",
        studentAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 5,
        comment: "Mr. Chinedu is an excellent programming teacher! I've gone from knowing nothing about coding to building my own web applications.",
        date: "2025-04-18"
      },
      {
        id: "r2",
        studentName: "Daniel Obi",
        studentAvatar: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 5,
        comment: "Very patient and knowledgeable. He made Python programming easy to understand with practical examples.",
        date: "2025-04-08"
      },
      {
        id: "r3",
        studentName: "Blessing Nwosu",
        studentAvatar: "https://randomuser.me/api/portraits/women/48.jpg",
        rating: 4,
        comment: "Great teacher who explains complex concepts clearly. My ICT grades have improved a lot since taking classes with him.",
        date: "2025-03-25"
      }
    ]
  }
};

interface Review {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  location: string;
  subjects: string[];
  education: string[];
  experience: string;
  bio: string;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalClasses: number;
  price: number;
  avatarUrl: string;
  isAvailableNow: boolean;
  reviews: Review[];
}

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    if (id && teachers[id as keyof typeof teachers]) {
      setTeacher(teachers[id as keyof typeof teachers]);
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-NG', options);
  };

  if (!teacher) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-24 pb-16 bg-learn9ja-gray">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-learn9ja-dark mb-4">Teacher not found</h1>
            <p className="text-gray-600 mb-6">The teacher profile you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/")}>
              Back to Home
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src={teacher.avatarUrl} 
                      alt={teacher.name}
                      className="w-32 h-32 rounded-full border-2 border-learn9ja-green mb-4"
                    />
                    <h1 className="text-2xl font-bold text-learn9ja-dark">{teacher.name}</h1>
                    <p className="text-gray-600 mt-1">{teacher.specialization}</p>
                    <p className="text-sm text-gray-500 mt-1">{teacher.location}</p>
                    
                    <div className="flex items-center mt-3">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-medium">{teacher.rating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-1">({teacher.totalReviews} reviews)</span>
                    </div>
                    
                    <p className="text-learn9ja-green font-bold text-2xl mt-4">₦{teacher.price.toLocaleString()}/hr</p>
                    
                    {teacher.isAvailableNow && (
                      <div className="mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        Available for instant classes
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                      <Link to={`/schedule/${teacher.id}`} state={{ instantClass: teacher.isAvailableNow }}>
                        {teacher.isAvailableNow ? (
                          <Button className="w-full bg-learn9ja-green hover:bg-learn9ja-green/90">
                            Instant Class
                          </Button>
                        ) : (
                          <Button variant="outline" disabled className="w-full">
                            Unavailable Now
                          </Button>
                        )}
                      </Link>
                      <Link to={`/schedule/${teacher.id}`}>
                        <Button variant={teacher.isAvailableNow ? "outline" : "default"} className="w-full">
                          Schedule Class
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-6">
                    <div>
                      <p className="text-2xl font-bold text-learn9ja-dark">{teacher.totalStudents}</p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-learn9ja-dark">{teacher.totalClasses}</p>
                      <p className="text-xs text-gray-500">Classes</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-learn9ja-dark">{Math.floor(teacher.totalClasses / 6)}</p>
                      <p className="text-xs text-gray-500">Hours</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <h3 className="font-semibold mb-2">Subjects</h3>
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
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="about">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold text-learn9ja-dark mb-3">About {teacher.name}</h2>
                          <p className="text-gray-700">{teacher.bio}</p>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4">
                          <h3 className="font-medium text-learn9ja-dark mb-2">Education</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {teacher.education.map((edu, index) => (
                              <li key={index}>{edu}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="experience" className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold text-learn9ja-dark mb-3">Teaching Experience</h2>
                          <p className="text-gray-700">{teacher.experience}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                          <div className="bg-learn9ja-green/5 p-4 rounded-lg">
                            <h4 className="font-medium text-learn9ja-green">Teaching Style</h4>
                            <p className="text-sm text-gray-700 mt-2">Interactive sessions with practical examples and visual aids</p>
                          </div>
                          <div className="bg-learn9ja-green/5 p-4 rounded-lg">
                            <h4 className="font-medium text-learn9ja-green">Specialization</h4>
                            <p className="text-sm text-gray-700 mt-2">Exam preparation and foundational concept building</p>
                          </div>
                          <div className="bg-learn9ja-green/5 p-4 rounded-lg">
                            <h4 className="font-medium text-learn9ja-green">Tools</h4>
                            <p className="text-sm text-gray-700 mt-2">Digital whiteboard, interactive quizzes, and practice problems</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="pt-6">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold text-learn9ja-dark">Student Reviews</h2>
                          <div className="flex items-center">
                            <span className="text-yellow-500 text-2xl mr-2">★</span>
                            <span className="text-2xl font-bold">{teacher.rating.toFixed(1)}</span>
                            <span className="text-gray-500 ml-2">({teacher.totalReviews} reviews)</span>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {teacher.reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                              <div className="flex items-start">
                                <img 
                                  src={review.studentAvatar} 
                                  alt={review.studentName}
                                  className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                  <div className="flex items-center">
                                    <h4 className="font-medium">{review.studentName}</h4>
                                    <span className="text-gray-400 text-sm ml-2">• {formatDate(review.date)}</span>
                                  </div>
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                  <p className="mt-2 text-gray-700">{review.comment}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-learn9ja-dark mb-6">Ready to start learning?</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to={`/schedule/${teacher.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">Schedule a Class</Button>
                  </Link>
                  <Link to={`/schedule/${teacher.id}`} state={{ instantClass: true }} className="flex-1">
                    <Button className="w-full bg-learn9ja-green hover:bg-learn9ja-green/90" disabled={!teacher.isAvailableNow}>
                      {teacher.isAvailableNow ? "Start Instant Class" : "Unavailable Now"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherProfile;
