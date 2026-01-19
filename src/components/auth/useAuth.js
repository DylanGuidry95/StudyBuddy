import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    signIn: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),
    signUp: (firstName, lastName,email, password) =>
      supabase.auth.signUp({ email, password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
       }),
    signOut: () => supabase.auth.signOut(),
  };
}
