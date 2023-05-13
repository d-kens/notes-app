import { useState, useEffect } from "react";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";

const NewNoteForm = ({ users }) => {
  const [addNewNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewNoteMutation()

  const navigate = useNavigate();

  const [ title, setTitle ] = useState('');
  const [ text, setText ] = useState('');
  const [ user, setUser ] = useState('');

  const onChangedTitle = e => setTitle(e.target.value);
  const onChangedText = e => setText(e.target.value);
  const onChangedUser = e =>setUser(e.target.value);

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    await addNewNote({
      user,
      title,
      text
    })
  }

  useEffect(() => {
    if(isSuccess) {
      setTitle('')
      setText('')
      setUser('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  const errClass = isError ? "errmsg" : "offscreen"

 
  const options = users.map(user => {
    return (
      <option key={ user.id } value={ user.id }>
        { user.username }
      </option>
    )
  })

  let content = (
    <>
     <p className={errClass}>{error?.data?.message}</p>
     <form
      className="form"
      onSubmit={ onSaveNoteClicked }
     >
      <div className="form__title-row">
        <h2>New Note</h2>
        <button className="btn"
          // disabled={!canSave}
        >
          Add
        </button>
      </div>

      <label>title: </label>
      <input
        className="form__input"
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={ onChangedTitle }
      />

      <label>text: </label>
      <textarea
        className="form__input"
        id="text"
        name="text"
        rows="7"
        value={ text }
        onChange={ onChangedText }
      ></textarea>

      <label>assigned to: </label>
      <select
        className="form__select"
        id="assignedTo"
        value={ user }
        onChange={ onChangedUser }
      >
        { options }
      </select>

     </form>
    </>
  )

  return content
}

export default NewNoteForm