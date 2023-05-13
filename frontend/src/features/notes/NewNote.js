import { selectAllUsers } from "../users/usersApiSlice";
import { useSelector } from "react-redux";
import NewNoteForm from "./NewNoteForm";


const NewNote = () => {
  const users = useSelector(selectAllUsers);

  let content = users ? <NewNoteForm users={users} /> : <p>Loading......</p>
  return content
}

export default NewNote