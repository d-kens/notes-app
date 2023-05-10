import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  const [ addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

  const navigate = useNavigate();

  const [ userName, setUserName ] = useState('');
  const [ validUserName, setValidUserName ] = useState(false);
  const [ password, setPassword ] = useState('');
  const [ validPassword, setValidPassword ] = useState(false);
  const [ roles, setRoles ] = useState(["Employee"]);

  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName))
  }, [userName])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  const onUsernameChanged = e => setUserName(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onRolesChanged = e => {
    const values = Array.from(
        e.target.selectedOptions, //HTMLCollection 
        (option) => option.value
    )
    setRoles(values)
  }

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUserName ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

  const canSave = [roles.length, validUserName, validPassword].every(Boolean) && !isLoading;
  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
        await addNewUser({ userName, password, roles })
    }
  }

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

  let content = (
    <>
     <p className={errClass}>{error?.data?.message}</p>
     <form className="form" onSubmit={onSaveUserClicked}>
        <div
            className="form__title-row"
        >
            <h2>New User</h2>
            <button
                className="btn"
                disabled={!canSave}
            >
                Add
            </button>
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
            value={userName}
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

export default NewUserForm