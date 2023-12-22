const checkSession = async () => {
    const server = import.meta.env.VITE_BACK_END_SERVE;

  const storedUserStr= sessionStorage.getItem('token')
if (storedUserStr){
   const storedUser = JSON.parse(storedUserStr)
   return storedUser
}else{

    try {
      const response = await fetch(`${server}/check_session`,{
        method: 'GET',
        credentials: 'include'     
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', JSON.stringify(data))
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
};
  export default checkSession;
  