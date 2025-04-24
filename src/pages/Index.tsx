
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import TeacherCard from "@/components/TeacherCard";

// Sample teacher data
const featuredTeachers = [
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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow mt-16">
        <HeroSection />
        
        <FeaturesSection />
        
        <section className="py-16 bg-learn9ja-gray">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-learn9ja-dark">
                Featured <span className="text-learn9ja-green">Teachers</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Meet some of our top-rated Nigerian teachers ready to help you excel.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTeachers.map((teacher) => (
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
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a href="/signup" className="btn-primary inline-flex px-8">
                View All Teachers
              </a>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
