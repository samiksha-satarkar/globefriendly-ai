import { Button } from "@/components/ui/button";
import { MapPin, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

interface TripPlannerHeroProps {
  onStartPlanning: () => void;
}

export const TripPlannerHero = ({ onStartPlanning }: TripPlannerHeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/40" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Planning</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Perfect Trip
          <br />
          <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
            Awaits
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Let our AI create personalized itineraries based on your preferences, budget, and travel style. 
          Discover hidden gems and unforgettable experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={onStartPlanning}
            className="group"
          >
            <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Start Planning
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
          >
            View Sample Trips
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/20 rounded-full animate-bounce" />
      <div className="absolute top-1/3 right-8 w-12 h-12 bg-primary-glow/20 rounded-full animate-pulse" />
    </div>
  );
};