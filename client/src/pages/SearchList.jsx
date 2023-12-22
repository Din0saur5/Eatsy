import { useOutletContext, useParams } from "react-router-dom";
import Search from '../components/Search';
import Navbar from '../components/Navbar';
const SearchList = () => {
  const {query} = useParams()  
  const queryParsed = query.split("-")

  const [userData, setUserData] = useOutletContext();
  return (
    <>
    <Navbar/>
    <div>
      <Search query= {queryParsed}/> 
    </div>
    </>
  )
}

export default SearchList