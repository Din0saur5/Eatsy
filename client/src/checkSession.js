

const checkSession = async () => {
const server = import.meta.env.VITE_BACK_END_SERVE
    
      // auto-login
    const user = await fetch(`${server}/check_session`).then((r) => {
        if (r.ok) {
          r.json().then((data) => {return data});
        }
      });
    
   return user ? user: null
    
}
export default checkSession;
