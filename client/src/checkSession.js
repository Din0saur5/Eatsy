import { supabase } from "./supabaseClient";

const checkSession = async () => {
    let token = false
  token = JSON.parse(sessionStorage.getItem('token'));
  console.log(token)
  if (!token) {
      
      try {
          const { data, error } = await supabase.auth.getSession();
          if (data && data.session) {
            
            sessionStorage.setItem('token',JSON.stringify(data.session))
              return true; // Authenticated
          } else {
              console.log('Not logged in');
              if (error) {
                  console.log('Error fetching session:', error);
              }
              return false; // Not authenticated
          }
      } catch (error) {
          console.error("Error in session check:", error);
          return null;
      }
  } else {
      return true; // Token exists, assuming authenticated
  }
};

export default checkSession;
