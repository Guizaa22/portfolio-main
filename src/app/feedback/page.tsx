'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import {
  Star,
  Quote,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  Users,
  ThumbsUp,
  MessageSquare,
  Filter
} from 'lucide-react';

// Sample testimonials and feedback data
const testimonials = [
  {
    id: 1,
    name: "Ahmed Ben Ali",
    company: "COFAT Automotive",
    position: "Project Manager",
    rating: 5,
    date: "2023-06-15",
    project: "Automotive Cable Tester",
    category: "Electronics Design",
    feedback: "Mohamed delivered exceptional work on our automotive cable testing project. His technical expertise in electronics and attention to detail exceeded our expectations. The tester he designed for Volkswagen and SEAT cables works flawlessly.",
    highlights: ["Technical Excellence", "On-time Delivery", "Professional Communication"],
    avatar: "🏢"
  },
  {
    id: 2,
    name: "Dr. Sarah Martinez",
    company: "TBC Technopole",
    position: "Research Director",
    rating: 5,
    date: "2023-08-20",
    project: "Solar Panel Tracking System",
    category: "IoT Systems",
    feedback: "The solar panel tracking system Mohamed developed during his internship was outstanding. His innovative approach to automation and IoT integration resulted in a 30% improvement in energy efficiency.",
    highlights: ["Innovation", "IoT Expertise", "Problem Solving"],
    avatar: "🔬"
  },
  {
    id: 3,
    name: "Prof. Karim Mansouri",
    company: "ENIT Robotics Lab",
    position: "Laboratory Supervisor",
    rating: 5,
    date: "2024-03-10",
    project: "Arduino Line Follower Robot",
    category: "Robotics",
    feedback: "Mohamed's line follower robot was one of the best submissions in our robotics competition. His programming skills and mechanical design approach showed deep understanding of embedded systems.",
    highlights: ["Programming Skills", "Creative Design", "Team Collaboration"],
    avatar: "🤖"
  },
  {
    id: 4,
    name: "Elena Rossi",
    company: "Tech Innovations Ltd",
    position: "CTO",
    rating: 4,
    date: "2024-01-15",
    project: "IoT Security System",
    category: "Security Systems",
    feedback: "Excellent work on the IoT security project. Mohamed's understanding of both hardware and software integration is impressive. The system is robust and user-friendly.",
    highlights: ["Security Expertise", "Full-Stack Skills", "Documentation"],
    avatar: "🔒"
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    company: "Smart Electronics Co.",
    position: "Senior Engineer",
    rating: 5,
    date: "2023-12-05",
    project: "ESP32 Automation System",
    category: "Automation",
    feedback: "Working with Mohamed on the ESP32 automation project was a pleasure. His knowledge of microcontrollers and wireless communication protocols is excellent. Highly recommended!",
    highlights: ["Microcontroller Expertise", "Wireless Protocols", "Clean Code"],
    avatar: "⚡"
  }
];

const categories = ["All", "Electronics Design", "IoT Systems", "Robotics", "Security Systems", "Automation"];

const overallStats = {
  totalProjects: 12,
  averageRating: 4.8,
  totalClients: 8,
  satisfactionRate: 96
};

export default function FeedbackPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const filteredTestimonials = testimonials.filter(
    testimonial => selectedCategory === "All" || testimonial.category === selectedCategory
  );

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === filteredTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-6">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Client Feedback & Reviews
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover what clients say about working with me on electronics, IoT, and automation projects
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{overallStats.totalProjects}</div>
          <div className="text-sm text-muted-foreground">Projects Completed</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-lg mx-auto mb-3">
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{overallStats.averageRating}</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mx-auto mb-3">
            <Users className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{overallStats.totalClients}</div>
          <div className="text-sm text-muted-foreground">Happy Clients</div>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg mx-auto mb-3">
            <ThumbsUp className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">{overallStats.satisfactionRate}%</div>
          <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground whitespace-nowrap">
          <Filter className="w-4 h-4" />
          Filter by:
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentTestimonial(0);
              }}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Testimonial */}
      {filteredTestimonials.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-6xl opacity-20">
              <Quote className="w-16 h-16" />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                disabled={filteredTestimonials.length <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                disabled={filteredTestimonials.length <= 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <blockquote className="text-lg md:text-xl leading-relaxed text-foreground mb-6">
                &ldquo;{filteredTestimonials[currentTestimonial].feedback}&rdquo;
              </blockquote>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {filteredTestimonials[currentTestimonial].highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {filteredTestimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {filteredTestimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {filteredTestimonials[currentTestimonial].position}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Building2 className="w-3 h-3" />
                    {filteredTestimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {renderStars(filteredTestimonials[currentTestimonial].rating)}
                <span className="ml-2 text-sm text-muted-foreground">
                  {filteredTestimonials[currentTestimonial].rating}/5
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(filteredTestimonials[currentTestimonial].date).toLocaleDateString()}
                </div>
                <div className="text-sm">
                  <strong>Project:</strong> {filteredTestimonials[currentTestimonial].project}
                </div>
                <Badge className="badge-info">
                  {filteredTestimonials[currentTestimonial].category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {filteredTestimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/40 cursor-pointer ${
              index === currentTestimonial ? 'ring-2 ring-primary/20' : ''
            }`}
            onClick={() => setCurrentTestimonial(index)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(testimonial.rating)}
              </div>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-3">
              &ldquo;{testimonial.feedback}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {testimonial.category}
              </Badge>
              <div className="text-xs text-muted-foreground">
                {new Date(testimonial.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-6">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join the list of satisfied clients who have trusted me with their electronics and IoT projects. 
          Let&apos;s discuss how I can help bring your ideas to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="/contact">
              Get Started Today
              <TrendingUp className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/projects">
              View My Work
              <Award className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
