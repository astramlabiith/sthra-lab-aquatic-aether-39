
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { BookOpen, Award, Users, Calendar } from 'lucide-react';

const Courses = () => {
  const currentCourses = [
    {
      title: "ME5073 Marine Robotics",
      semester: "Jan 25 – April 25",
      instructor: "Dr. Himabindu Allaka",
      description: "Advanced course covering marine robotics principles, underwater systems design, and autonomous navigation in marine environments.",
      type: "current"
    },
    {
      title: "ME3413 Machine Drawing & Solid Modelling",
      semester: "Jan 25 – April 25", 
      instructor: "Dr. Himabindu Allaka",
      description: "Comprehensive course on technical drawing, CAD principles, and solid modeling techniques for mechanical engineering applications.",
      type: "current"
    }
  ];

  const upcomingCourses = [
    {
      title: "ME5770 Fundamentals of Robotics",
      semester: "Jul 25 – Nov 25",
      instructor: "Dr. Himabindu Allaka",
      description: "Introduction to robotics fundamentals, including kinematics, dynamics, control systems, and programming for robotic applications.",
      type: "upcoming"
    },
    {
      title: "ME5051 Sensors and Actuators",
      semester: "Jul 25 – Nov 25",
      instructor: "Dr. Himabindu Allaka", 
      description: "Study of various sensors and actuators used in mechanical systems, with focus on selection, integration, and applications in automation.",
      type: "upcoming"
    }
  ];

  const grants = [
    {
      title: "Development of an Unmanned Surface Vehicle (USV) Platform for In-Situ Water Sampling, Bathymetry, Sludge Quantification, and Monitoring of Urban Lakes",
      type: "Seed Grant",
      duration: "Jul 24 – Present",
      institution: "IIT Hyderabad",
      description: "Research project focused on developing autonomous surface vehicles for comprehensive water quality monitoring and environmental assessment."
    },
    {
      title: "Development of a Sensor Suite for Enhanced Situational Awareness and GNSS-Denied Navigation in Multi-Domain Manned and Unmanned Systems",
      type: "ANRF: Early Career Research Grant",
      duration: "Jul 24 – Present", 
      institution: "IIT Hyderabad",
      description: "Advanced research on sensor fusion technologies for autonomous navigation in challenging environments without GPS dependency."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
          <div className="container-width">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
                Courses & Research Grants
              </h1>
              <p className="academic-body text-lg max-w-4xl mx-auto">
                Explore our comprehensive curriculum and ongoing research initiatives that advance knowledge in autonomous systems, robotics, and marine technology.
              </p>
            </div>

            {/* Current Courses */}
            <div className="mb-16">
              <h2 className="academic-subheading text-center mb-8 flex items-center justify-center">
                <Calendar className="mr-3 text-blue-800" size={28} />
                Current Courses (Jan 25 – April 25)
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {currentCourses.map((course, index) => (
                  <div key={index} className="academic-card p-6 hover:scale-105 transition-transform duration-200">
                    <div className="flex items-center mb-4">
                      <BookOpen className="text-blue-800 mr-3" size={24} />
                      <h3 className="text-xl font-bold text-gray-900">
                        {course.title}
                      </h3>
                    </div>
                    <p className="text-primary font-semibold mb-3">
                      {course.instructor}
                    </p>
                    <p className="text-gray-600 mb-3 font-medium">
                      {course.semester}
                    </p>
                    <p className="academic-body mb-6">
                      {course.description}
                    </p>
                    <button className="academic-button-primary flex items-center justify-center space-x-2">
                      <Users size={16} />
                      <span>Course Details</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Courses */}
            <div className="mb-16">
              <h2 className="academic-subheading text-center mb-8 flex items-center justify-center">
                <Calendar className="mr-3 text-blue-800" size={28} />
                Upcoming Courses (Jul 25 – Nov 25)
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingCourses.map((course, index) => (
                  <div key={index} className="academic-card p-6 hover:scale-105 transition-transform duration-200 border-l-4 border-orange-500">
                    <div className="flex items-center mb-4">
                      <BookOpen className="text-blue-800 mr-3" size={24} />
                      <h3 className="text-xl font-bold text-gray-900">
                        {course.title}
                      </h3>
                    </div>
                    <p className="text-primary font-semibold mb-3">
                      {course.instructor}
                    </p>
                    <p className="text-gray-600 mb-3 font-medium">
                      {course.semester}
                    </p>
                    <p className="academic-body mb-6">
                      {course.description}
                    </p>
                    <button className="academic-button-secondary flex items-center justify-center space-x-2">
                      <Users size={16} />
                      <span>Course Preview</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Grants */}
            <div>
              <h2 className="academic-subheading text-center mb-8 flex items-center justify-center">
                <Award className="mr-3 text-blue-800" size={28} />
                Research Grants
              </h2>
              <div className="space-y-8">
                {grants.map((grant, index) => (
                  <div key={index} className="academic-card p-8 hover:scale-105 transition-transform duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {grant.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                          <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200 font-medium">
                            {grant.type}
                          </span>
                          <span className="text-gray-600">
                            <strong>Duration:</strong> {grant.duration}
                          </span>
                          <span className="text-gray-600">
                            <strong>Institution:</strong> {grant.institution}
                          </span>
                        </div>
                      </div>
                      <Award className="text-blue-800 flex-shrink-0 ml-4" size={24} />
                    </div>
                    <p className="academic-body leading-relaxed">
                      {grant.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
