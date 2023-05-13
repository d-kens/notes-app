import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation()

  const [deleteUser, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    erro: delError
  }] = useDeleteUserMutation()

  const navigate = useNavigate();

  const [ username, setUsername ] = useState(user.username);
  const [ validUsername, setValidUsername ] = useState(false);
  const [ password, setPassword ] = useState('');
  const [ validPassword, setValidPassword ] = useState(false);
  const [ roles, setRoles ] = useState(user.roles);
  const [ active, setActive ] = useState(user.active);

  /* 
  * Check if username and password are valid
  */
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  /* 
  * check isSuccess and isDelSuccess status
  */
 useEffect(() => {
    if(isSuccess || isDelSuccess) {
        setUsername('');
        setPassword('');
        setRoles([]);
        navigate('/dash/users')
    }

 }, [isDelSuccess, isSuccess, navigate])

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onRolesChanged = e => {
    const values = Array.from(
        e.target.selectedOptions, //HTMLCollection 
        (option) => option.value
    )
    setRoles(values)
  }
  const onActiveChanged = () => setActive(prev => !prev)

  const onSaveUserClicked = async (e) => {
    if(password) {
        await updateUser({
            id: user.id,
            username,
            password,
            roles,
            active
        })
    } else {
        await updateUser({
            id: user.id,
            username,
            roles,
            active
        })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({
        id: user.id
    })
  }

  let canSave;
  if(password) {
    canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

  /* null coalescing operator */
  const errContent = (error?.data?.message || delError?.data?.message) ?? ''

  const options = Object.values(ROLES).map(role => {
    return (
        <option
            key={role}
            value={role}
        >
            {role}
        </option>
    )
  })

  const content = (
    <>
        <p className={errClass}>{ errContent }</p>
        <form className="form" onSubmit={e => e.preventDefault()}>
            <div
                className="form__title-row"
            >
                <h2>New User</h2>
                <div className="form__action-buttons">
                    <button
                        className="btn"
                        disabled={!canSave}
                        onClick={onSaveUserClicked}
                    >
                        Edit
                    </button>
                    <button
                        className="btn"
                        disabled={!canSave}
                        onClick={onDeleteUserClicked}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <label htmlFor="username">
                username: <span>[3 - 20 letters]</span>
            </label>
            <input
                className={`form__input ${validUserClass}`}
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                value={username}
                onChange={ onUsernameChanged }
            />

            <label htmlFor="password">
                password: <span>[4 - 12 chars incl. !@#$%]</span>
            </label>
            <input
                className={`form__input ${validPwdClass}`}
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={onPasswordChanged}
            />

            <label className="form__checkbox-container">
                ACTIVE:
                <input 
                    className="form__checkbox"
                    id="user-active"
                    name="user-active"
                    type="checkbox"
                    checked={active}
                    onChange={onActiveChanged}
                />
            </label>

            <label htmlFor="roles">
             roles
            </label>
            <select
                id="roles"
                name="roles"
                className={`form__select ${validRolesClass}`}
                multiple={true}
                size={3}
                value={roles}
                onChange={onRolesChanged}
            >
                { options }
            </select>
        </form>
    </>
  )


  return content
}

export default EditUserForm