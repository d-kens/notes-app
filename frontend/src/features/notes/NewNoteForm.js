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
  const [ userId, setUserId ] = useState('');

  const onChangedTitle = e => setTitle(e.target.value);
  const onChangedText = e => setText(e.target.value);
  const onChangedUserId = e =>setUserId(e.target.value);

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validTextClass = !text ? "form__input--incomplete" : ''

  
  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    console.log('clicked')
    e.preventDefault();
    if (canSave){
      await addNewNote({
        userId,
        title,
        text
      })
    }
  }

  useEffect(() => {
    if(isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  

 
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
        <button 
          className="btn"
          // disabled={!canSave}
        >
          Add
        </button>
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
      />

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

export default NewNoteForm