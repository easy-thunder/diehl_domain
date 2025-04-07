import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supaBase/supabaseClient";

const animals = [
    "otter", "fox", "panda", "tiger", "lion", "bear", "wolf", "eagle", "owl", "hawk",
    "falcon", "shark", "whale", "dolphin", "penguin", "kangaroo", "koala", "giraffe", "zebra", "elephant",
    "rhino", "hippo", "cheetah", "leopard", "jaguar", "lynx", "raccoon", "badger", "moose", "deer",
    "camel", "goat", "sheep", "cow", "bull", "buffalo", "beaver", "lemur", "wombat", "platypus",
    "sloth", "anteater", "bat", "hedgehog", "porcupine", "ferret", "meerkat", "mongoose", "crocodile", "alligator",
    "lizard", "gecko", "iguana", "snake", "frog", "toad", "newt", "salamander", "turtle", "tortoise",
    "crab", "lobster", "octopus", "squid", "jellyfish", "starfish", "clam", "snail", "slug", "ant",
    "bee", "wasp", "butterfly", "moth", "dragonfly", "ladybug", "spider", "scorpion", "horse", "donkey",
    "rabbit", "mouse", "rat", "hamster", "gerbil", "chinchilla", "parrot", "canary", "peacock", "rooster",
    "chicken", "duck", "goose", "turkey", "pigeon", "crow", "sparrow", "flamingo", "swan", "emu"
  ];


  const adjectives = [
    "brave", "happy", "bold", "clever", "sneaky", "noisy", "quick", "lazy", "zany", "fuzzy",
    "grumpy", "shy", "bouncy", "witty", "quirky", "sleepy", "jolly", "cheery", "gentle", "spicy",
    "fiery", "bright", "cool", "stormy", "breezy", "silent", "tiny", "giant", "hungry", "curious",
    "zesty", "fierce", "proud", "swift", "crafty", "dizzy", "mighty", "weird", "plucky", "dusty",
    "cranky", "fluffy", "sparkly", "giddy", "nervy", "tough", "chatty", "whiny", "brilliant", "bitter",
    "glossy", "peppy", "rowdy", "sunny", "snappy", "thirsty", "vivid", "rusty", "blurry", "jazzy",
    "fancy", "fuzzy", "nifty", "gritty", "chilly", "loopy", "bubbly", "frosty", "cheeky", "zippy",
    "moody", "dandy", "soggy", "drowsy", "goofy", "crisp", "perky", "muddy", "nutty", "cloudy",
    "cozy", "sharp", "sassy", "loud", "tidy", "wild", "smoky", "stealthy", "pointy", "awkward",
    "gloomy", "messy", "sneaky", "funky", "edgy", "tame", "boisterous", "thrifty", "wobbly", "yappy"
  ];

interface UserContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  session: null,
  loading: true,
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

// /context/UserContext.tsx
useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
  
      if (session?.user) {
        const userId = session.user.id;
  
        // Check if user exists
        const { data: existingUser, error } = await supabase
          .from("users")
          .select("id")
          .eq("id", userId)
          .maybeSingle();
          console.log("existingUser:", existingUser, "error:", error);

          if (error) {
            console.error("Error checking user:", error);
            return;
          }

          if (!existingUser) {
            console.log("No existing user found, creating...");
            const username = `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${animals[Math.floor(Math.random() * animals.length)]}`;
            const { error: insertError } = await supabase
              .from("users")
              .insert([{ id: userId, username, win_percent: 100, wins: 0, losses: 0, games_played: 0 }]);
          
            if (insertError) {
              console.error("Insert error:", insertError.message);
            }
          } else {
            console.log("User found:", existingUser);
          }
      }
    };
  
    init();
  
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (event === "SIGNED_IN" && session?.user) init(); // Ensure user is created
    });
  
    return () => listener.subscription.unsubscribe();
  }, []);
  
  

  return (
    <UserContext.Provider value={{ user, session, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
