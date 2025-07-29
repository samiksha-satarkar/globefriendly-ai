import { useState } from "react";
import { TripPlannerHero } from "@/components/TripPlannerHero";
import { TripPreferencesForm } from "@/components/TripPreferencesForm";
import { TripItinerary } from "@/components/TripItinerary";
import { useToast } from "@/components/ui/use-toast";

type AppState = "hero" | "planning" | "itinerary";

interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: string;
  interests: string[];
  travelStyle: string;
  specialRequests: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("hero");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripData, setTripData] = useState<any>(null);
  const { toast } = useToast();

  const handleStartPlanning = () => {
    setCurrentState("planning");
  };

  const handleGenerateTrip = async (preferences: TripPreferences) => {
    setIsGenerating(true);
    
    // Simulate AI trip generation
    try {
      // In a real app, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setTripData({
        destination: preferences.destination,
        preferences
      });
      
      toast({
        title: "Trip Generated!",
        description: `Your personalized ${preferences.destination} itinerary is ready!`,
      });
      
      setCurrentState("itinerary");
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToPlanning = () => {
    setCurrentState("planning");
  };

  const handleBackToHero = () => {
    setCurrentState("hero");
    setTripData(null);
  };

  return (
    <div className="min-h-screen">
      {currentState === "hero" && (
        <TripPlannerHero onStartPlanning={handleStartPlanning} />
      )}
      
      {currentState === "planning" && (
        <TripPreferencesForm 
          onSubmit={handleGenerateTrip} 
          isLoading={isGenerating}
        />
      )}
      
      {currentState === "itinerary" && tripData && (
        <TripItinerary 
          destination={tripData.destination}
          onBack={handleBackToPlanning}
        />
      )}
    </div>
  );
};

export default Index;
