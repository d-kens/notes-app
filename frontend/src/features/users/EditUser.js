/*
* we don't have a subscription since we are not querying the data
 - We don't need to query the data since we already queried it
*/
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector(state => selectUserById(state, id));
  const content = user ? <EditUserForm user={ user } /> : <p>Loading......</p>;
  
  return content;
}

export default EditUser