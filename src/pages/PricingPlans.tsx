
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState("student");

  const studentPlans = [
    {
      title: "Basic",
      price: 0,
      features: [
        "Access to teacher profiles",
        "Schedule classes with teachers",
        "In-app messaging with teachers",
        "Basic learning resources",
        "24/7 customer support"
      ],
      isPopular: false
    },
    {
      title: "Premium",
      price: 5000,
      features: [
        "All Basic features",
        "Access to class recordings",
        "Priority matching with teachers",
        "Advanced learning analytics",
        "Study groups with other students",
        "Premium learning resources"
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      price: 12000,
      features: [
        "All Premium features",
        "Dedicated account manager",
        "Custom learning paths",
        "Group classes for schools",
        "Bulk student management",
        "White-label options for institutions"
      ],
      isPopular: false
    }
  ];

  const teacherPlans = [
    {
      title: "Basic",
      price: 0,
      features: [
        "Create teacher profile",
        "Receive scheduled bookings",
        "In-app messaging with students",
        "Basic teaching tools",
        "Payment processing"
      ],
      isPopular: false
    },
    {
      title: "Premium",
      price: 7500,
      features: [
        "All Basic features",
        "Offer instant classes",
        "Enhanced profile visibility",
        "Record and share classes",
        "Advanced teaching tools",
        "Priority customer support"
      ],
      isPopular: true
    },
    {
      title: "Professional",
      price: 15000,
      features: [
        "All Premium features",
        "Lower platform fees (5%)",
        "Create and sell courses",
        "Advanced analytics dashboard",
        "Promotional opportunities",
        "Featured teacher placement"
      ],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 pb-16 bg-learn9ja-gray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-learn9ja-dark">
              Simple, Transparent <span className="text-learn9ja-green">Pricing</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that works best for your learning or teaching needs.
              Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="mt-12">
            <Tabs 
              defaultValue="student" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center">
                <TabsList className="mb-8">
                  <TabsTrigger value="student" className="px-8">For Students</TabsTrigger>
                  <TabsTrigger value="teacher" className="px-8">For Teachers</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="student">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {studentPlans.map((plan, index) => (
                    <PricingCard
                      key={index}
                      title={plan.title}
                      price={plan.price}
                      features={plan.features}
                      isPopular={plan.isPopular}
                      forTeacher={false}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="teacher">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {teacherPlans.map((plan, index) => (
                    <PricingCard
                      key={index}
                      title={plan.title}
                      price={plan.price}
                      features={plan.features}
                      isPopular={plan.isPopular}
                      forTeacher={true}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-16 bg-white p-6 md:p-10 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-learn9ja-dark text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-learn9ja-dark">How do payments work?</h3>
                <p className="mt-2 text-gray-600">
                  We process payments securely through trusted payment gateways. Teachers receive payments directly to their accounts after each class, minus platform fees.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-learn9ja-dark">Can I cancel my subscription?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, you can cancel your subscription at any time. You will continue to have access to premium features until the end of your billing cycle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-learn9ja-dark">What is an instant class?</h3>
                <p className="mt-2 text-gray-600">
                  Instant classes allow premium teachers to be available for immediate sessions when students need urgent help with specific topics.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-learn9ja-dark">Are class recordings secure?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, all class recordings are securely stored and only available to the student and teacher involved in the class. Premium students can access these for review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPlans;
