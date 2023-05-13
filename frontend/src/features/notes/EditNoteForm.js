import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";

const EditNoteForm = ({ note, users }) => {
  const [updateNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation();

  const [deleteNote, {
    isLoading: isDelLoading,
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [ title, setTitle ] = useState(note.title);
  const [ text, setText ] = useState(note.text);
  const [ user, setUser ] = useState(note.user);
  const [ completed, setCompleted ] = useState(note.completed)

  const onChangedTitle = e => setTitle(e.target.value);
  const onChangedText = e => setText(e.target.value);
  const onChangedUser = e => setUser(e.target.value);
  const onChangedCompleted = e => setCompleted(prev => !prev)

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
  /* null coalescing operator */
  const errContent = (error?.data?.message || delError?.data?.message) ?? ''

  const onSaveNoteClicked = async (e) => {
    await updateNote({
      id: note.id,
      user,
      title,
      text,completed
    })
  }

  const onDeleteNoteClicked = async () => {
    await deleteNote({
      id: note.id
    })
  }

  useEffect(() => {
    if(isSuccess || isDelSuccess) {
      setTitle('');
      setText('');
      setUser('')
      setCompleted('')
      navigate('/dash/notes')
    }
 }, [isDelSuccess, isSuccess, navigate])

  const options = users.map(user => {
    return (
      <option key={ user.id } value={ user.id }>
        { user.username }
      </option>
    )
  })

  let content = (
    <>
     <p className={errClass}>{ errContent }</p>
     <form
      className="form"
      onSubmit={ e => e.preventDefault() }
     >
      <div className="form__title-row">
        <h2>New Note</h2>
        <div className="form__action-buttons">
          <button
            className="btn"
            // disabled={!canSave}
            onClick={onSaveNoteClicked}
          >
            Edit
          </button>
          <button
            className="btn"
            // disabled={!canSave}
            onClick={onDeleteNoteClicked}
          >
            Delete
          </button>
                </div>
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

      <label className="form__checkbox-container">
        status:
        <input
          className="form__checkbox"
          id="status"
          name="status"
          type="checkbox"
          checked={completed}
          onChange={onChangedCompleted}
        />
      </label>

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

export default EditNoteForm