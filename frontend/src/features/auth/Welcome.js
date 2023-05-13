import { Link } from 'react-router-dom';

const Welcome = () => {
  const content = (
    <section className="welcome">
        <h1>Welcome!</h1>
        <p>
          <Link to='/dash/notes'>view notes</Link>
        </p>

        <p>
          <Link to='/dash/notes/newNote'>add new note</Link>
        </p>

        <p>
          <Link to='/dash/users'>view user settings</Link>
        </p>

        <p>
          <Link to='/dash/users/newUser'>add new user</Link>
        </p>
    </section>
  )
  return content
}

export default Welcome