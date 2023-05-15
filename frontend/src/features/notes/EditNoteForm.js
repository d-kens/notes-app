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
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [ title, setTitle ] = useState(note.title);
  const [ text, setText ] = useState(note.text);
  const [ userId, setUserId ] = useState(note.user);
  const [ completed, setCompleted ] = useState(note.completed)

  const onChangedTitle = e => setTitle(e.target.value);
  const onChangedText = e => setText(e.target.value);
  const onChangedUserId = e => setUserId(e.target.value);
  const onChangedCompleted = e => setCompleted(prev => !prev)

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || delError?.data?.message) ?? '';
  const validTitleClass = !title ? "form__input--incomplete" : '';
  const validTextClass = !text ? "form__input--incomplete" : '';

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({
        id: note.id,
        user: userId,
        title,
        text,
        completed
      })
    }
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
      setUserId('')
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
            disabled={!canSave}
            onClick={onSaveNoteClicked}
          >
            Edit
          </button>
          <button
            className="btn"
            onClick={onDeleteNoteClicked}
          >
            Delete
          </button>
        </div>
      </div>

      <label>title: </label>
      <input
        className={`form__input ${validTitleClass}`}
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={ onChangedTitle }
      />

      <label>text: </label>
      <textarea
        className={`form__input ${validTextClass}`}
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
        value={ userId }
        onChange={ onChangedUserId }
      >
        { options }
      </select>

     </form>
    </>
  )

  return content
}

export default EditNoteForm