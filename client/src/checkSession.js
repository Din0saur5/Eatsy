const checkSession = async () => {
    const server = import.meta.env.VITE_BACK_END_SERVE;
  
    // await fetch('http://127.0.0.1:5555/set-cookie', {
    //     credentials: 'include'
    //   })
    //   .then(response => response.text())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));
  const storedUserStr= sessionStorage.getItem('token')
if (storedUserStr){
   const storedUser = JSON.parse(storedUserStr)
   return storedUser
}else{

    try {
      // auto-login
      const response = await fetch(`${server}/check_session`,{
        method: 'GET',
        credentials: 'include'  // Important for including cookies in cross-origin requests
       
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', JSON.stringify(data))
        return data;
      } else {
        // Handle non-OK responses here, e.g., redirect to login or show message
        // console.error('Session check failed:', response.status);
        return null;
      }
    } catch (error) {
      // Handle network error, server down, etc.
      // console.error('Error during session check:', error);
      return null;
    }
  }
};
  export default checkSession;
  