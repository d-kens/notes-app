import { store } from "../../app/store";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";


const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing');
    /* 
    * manual subscription to notes and users 
    - this way we have access to the state and won't expire in 5sec or 60 secs(default)
    - this also helps when we refresh the page and we still want to have the state
    */
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())

    return () => {
      console.log('unsubscribing');
      users.unsubscribe();
      notes.unsubscribe();
    }

  }, [])

  return <Outlet />
}

export default Prefetch