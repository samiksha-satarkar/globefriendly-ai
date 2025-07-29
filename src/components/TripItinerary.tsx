import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Star, 
  Calendar, 
  Camera, 
  Utensils, 
  Bed,
  ArrowLeft,
  Heart,
  Share2 
} from "lucide-react";
import mountainsImage from "@/assets/mountains.jpg";
import cityImage from "@/assets/city.jpg";
import rainforestImage from "@/assets/rainforest.jpg";

interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
  type: "sightseeing" | "dining" | "activity" | "hotel";
  rating?: number;
  image?: string;
}

interface DayItinerary {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
}

interface TripItineraryProps {
  itinerary: DayItinerary[];
  destination: string;
  onBack: () => void;
}

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "sightseeing": return <Camera className="w-4 h-4" />;
    case "dining": return <Utensils className="w-4 h-4" />;
    case "hotel": return <Bed className="w-4 h-4" />;
    default: return <MapPin className="w-4 h-4" />;
  }
};

// Sample itinerary data - in a real app this would come from the AI
const sampleItinerary: DayItinerary[] = [
  {
    day: 1,
    date: "March 15, 2024",
    title: "Arrival & City Exploration",
    activities: [
      {
        time: "10:00 AM",
        title: "Hotel Check-in",
        description: "Luxury resort with ocean views and spa facilities",
        location: "Paradise Beach Resort",
        type: "hotel",
        rating: 4.8,
        image: cityImage
      },
      {
        time: "2:00 PM",
        title: "Historic Old Town Tour",
        description: "Guided walking tour through cobblestone streets and ancient architecture",
        location: "Old Town Square",
        type: "sightseeing",
        rating: 4.6,
        image: cityImage
      },
      {
        time: "7:00 PM",
        title: "Sunset Dinner",
        description: "Fine dining with local specialties and panoramic city views",
        location: "Sky Terrace Restaurant",
        type: "dining",
        rating: 4.9
      }
    ]
  },
  {
    day: 2,
    date: "March 16, 2024",
    title: "Mountain Adventure",
    activities: [
      {
        time: "8:00 AM",
        title: "Mountain Hiking Trail",
        description: "Scenic hike through alpine meadows with stunning mountain vistas",
        location: "Eagle Peak Trail",
        type: "activity",
        rating: 4.7,
        image: mountainsImage
      },
      {
        time: "12:30 PM",
        title: "Mountain Lodge Lunch",
        description: "Traditional mountain cuisine with local ingredients",
        location: "Alpine Lodge",
        type: "dining",
        rating: 4.5
      },
      {
        time: "3:00 PM",
        title: "Cable Car Ride",
        description: "Breathtaking aerial views of the mountain range",
        location: "Summit Station",
        type: "sightseeing",
        rating: 4.8
      }
    ]
  },
  {
    day: 3,
    date: "March 17, 2024",
    title: "Rainforest Exploration",
    activities: [
      {
        time: "9:00 AM",
        title: "Rainforest Trek",
        description: "Guided nature walk through lush tropical rainforest",
        location: "Emerald Forest Reserve",
        type: "activity",
        rating: 4.6,
        image: rainforestImage
      },
      {
        time: "1:00 PM",
        title: "Waterfall Swimming",
        description: "Refreshing swim in natural pools beneath cascading waterfalls",
        location: "Crystal Falls",
        type: "activity",
        rating: 4.9
      }
    ]
  }
];

export const TripItinerary = ({ 
  itinerary = sampleItinerary, 
  destination = "Costa Rica", 
  onBack 
}: TripItineraryProps) => {
  return (
    <div className="min-h-screen bg-gradient-sky py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="bg-white/80 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your {destination} Adventure</h1>
              <p className="text-muted-foreground">AI-crafted itinerary • 3 days</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              Save
            </Button>
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Trip Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-gradient-ocean text-white">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5" />
              <h3 className="font-semibold">Duration</h3>
            </div>
            <p className="text-2xl font-bold">3 Days</p>
            <p className="text-white/80">Perfect weekend getaway</p>
          </Card>
          
          <Card className="p-6 bg-gradient-sunset text-white">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5" />
              <h3 className="font-semibold">Activities</h3>
            </div>
            <p className="text-2xl font-bold">8 Experiences</p>
            <p className="text-white/80">Curated just for you</p>
          </Card>
          
          <Card className="p-6 bg-primary text-primary-foreground">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5" />
              <h3 className="font-semibold">Rating</h3>
            </div>
            <p className="text-2xl font-bold">4.7/5</p>
            <p className="text-primary-foreground/80">Highly recommended</p>
          </Card>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-8">
          {itinerary.map((day) => (
            <Card key={day.day} className="p-8 shadow-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {day.day}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{day.title}</h2>
                  <p className="text-muted-foreground">{day.date}</p>
                </div>
              </div>

              <div className="space-y-6">
                {day.activities.map((activity, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary/10 text-primary rounded-full p-2 mb-2">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {activity.time}
                      </div>
                      {index < day.activities.length - 1 && (
                        <div className="w-px h-12 bg-border mt-4" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{activity.title}</h3>
                            {activity.rating && (
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                {activity.rating}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{activity.description}</p>
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <MapPin className="w-3 h-3" />
                            {activity.location}
                          </div>
                        </div>

                        {activity.image && (
                          <div 
                            className="w-24 h-24 bg-cover bg-center rounded-lg shadow-md"
                            style={{ backgroundImage: `url(${activity.image})` }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <Button variant="hero" size="lg">
            Book This Trip
          </Button>
          <Button variant="sunset" size="lg">
            Customize Itinerary
          </Button>
        </div>
      </div>
    </div>
  );
};