-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  country TEXT,
  language TEXT DEFAULT 'en',
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trips table
CREATE TABLE public.trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget DECIMAL(10, 2),
  travelers INTEGER NOT NULL DEFAULT 1,
  interests TEXT[] DEFAULT '{}',
  travel_style TEXT DEFAULT 'comfort',
  special_requests TEXT,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'confirmed', 'completed', 'cancelled')),
  ai_generated BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on trips
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Create policies for trips
CREATE POLICY "Users can view their own trips" 
ON public.trips 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own trips" 
ON public.trips 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" 
ON public.trips 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips" 
ON public.trips 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create itineraries table
CREATE TABLE public.itineraries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  activities JSONB DEFAULT '[]',
  total_cost DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on itineraries
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;

-- Create policies for itineraries
CREATE POLICY "Users can view itineraries for their trips" 
ON public.itineraries 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.trips 
  WHERE trips.id = itineraries.trip_id 
  AND trips.user_id = auth.uid()
));

CREATE POLICY "Users can create itineraries for their trips" 
ON public.itineraries 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.trips 
  WHERE trips.id = itineraries.trip_id 
  AND trips.user_id = auth.uid()
));

CREATE POLICY "Users can update itineraries for their trips" 
ON public.itineraries 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.trips 
  WHERE trips.id = itineraries.trip_id 
  AND trips.user_id = auth.uid()
));

CREATE POLICY "Users can delete itineraries for their trips" 
ON public.itineraries 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.trips 
  WHERE trips.id = itineraries.trip_id 
  AND trips.user_id = auth.uid()
));

-- Create saved places table
CREATE TABLE public.saved_places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  rating DECIMAL(2, 1),
  price_level INTEGER,
  details JSONB DEFAULT '{}',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on saved places
ALTER TABLE public.saved_places ENABLE ROW LEVEL SECURITY;

-- Create policies for saved places
CREATE POLICY "Users can view their own saved places" 
ON public.saved_places 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved places" 
ON public.saved_places 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved places" 
ON public.saved_places 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at
  BEFORE UPDATE ON public.itineraries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_trips_user_id ON public.trips(user_id);
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_trips_dates ON public.trips(start_date, end_date);
CREATE INDEX idx_itineraries_trip_id ON public.itineraries(trip_id);
CREATE INDEX idx_itineraries_day ON public.itineraries(day_number);
CREATE INDEX idx_saved_places_user_id ON public.saved_places(user_id);
CREATE INDEX idx_saved_places_location ON public.saved_places(location);