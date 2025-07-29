import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, DollarSign, Users, Heart, Sparkles } from "lucide-react";

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

interface TripPreferencesFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  isLoading?: boolean;
}

const interestOptions = [
  "Adventure", "Culture", "Food", "Nature", "History", "Art", 
  "Beach", "Mountains", "Cities", "Wildlife", "Photography", "Relaxation"
];

const travelStyles = [
  { id: "luxury", name: "Luxury", desc: "Premium experiences and accommodations" },
  { id: "comfort", name: "Comfort", desc: "Balance of comfort and value" },
  { id: "budget", name: "Budget", desc: "Cost-effective travel options" },
  { id: "adventure", name: "Adventure", desc: "Off-the-beaten-path experiences" }
];

export const TripPreferencesForm = ({ onSubmit, isLoading = false }: TripPreferencesFormProps) => {
  const [preferences, setPreferences] = useState<TripPreferences>({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "2",
    interests: [],
    travelStyle: "comfort",
    specialRequests: ""
  });

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <div className="min-h-screen bg-gradient-sky py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Personalize Your Journey</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Tell Us About Your Dream Trip</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your preferences and let our AI create the perfect itinerary tailored just for you
          </p>
        </div>

        <Card className="p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Destination & Dates */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-base font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  placeholder="Where would you like to go?"
                  value={preferences.destination}
                  onChange={(e) => setPreferences(prev => ({ ...prev, destination: e.target.value }))}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-base font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={preferences.startDate}
                  onChange={(e) => setPreferences(prev => ({ ...prev, startDate: e.target.value }))}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-base font-medium">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={preferences.endDate}
                  onChange={(e) => setPreferences(prev => ({ ...prev, endDate: e.target.value }))}
                  className="h-12"
                />
              </div>
            </div>

            {/* Budget & Travelers */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-base font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Budget (USD)
                </Label>
                <Input
                  id="budget"
                  placeholder="e.g. $2000 per person"
                  value={preferences.budget}
                  onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-base font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Number of Travelers
                </Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  value={preferences.travelers}
                  onChange={(e) => setPreferences(prev => ({ ...prev, travelers: e.target.value }))}
                  className="h-12"
                />
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                What interests you?
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-smooth ${
                      preferences.interests.includes(interest)
                        ? "bg-primary text-primary-foreground border-primary shadow-travel"
                        : "bg-background border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Travel Style</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id }))}
                    className={`p-4 rounded-xl border text-left transition-smooth ${
                      preferences.travelStyle === style.id
                        ? "bg-primary text-primary-foreground border-primary shadow-travel"
                        : "bg-background border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="font-medium">{style.name}</div>
                    <div className="text-sm opacity-80">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-base font-medium">
                Special Requests or Requirements
              </Label>
              <Textarea
                id="specialRequests"
                placeholder="Any dietary restrictions, accessibility needs, or special occasions?"
                value={preferences.specialRequests}
                onChange={(e) => setPreferences(prev => ({ ...prev, specialRequests: e.target.value }))}
                className="min-h-24"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading || !preferences.destination || !preferences.startDate}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Crafting Your Perfect Trip...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate My Trip Plan
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};