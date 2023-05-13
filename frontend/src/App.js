import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import NewNote from './features/notes/NewNote';
import EditNote from './features/notes/EditNote';
import UserList from './features/users/UsersList';
import NewUserForm from './features/users/NewUserForm';
import EditUser from './features/users/EditUser';
import Prefetch from './features/auth/Prefetch';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Public />} />
                <Route path='login' element={<Login />} />

                <Route element={<Prefetch />} >
                    {/* protected route */}
                    <Route path='dash' element={<DashLayout/>} >
                        <Route index element={<Welcome />} />
                        <Route path='notes'>
                            <Route index element={<NotesList />} />
                            <Route path=':id' element={<EditNote />} />
                            <Route path='newNote' element={<NewNote />} />
                        </Route>
                        <Route path='users'>
                            <Route index element={<UserList />} />
                            <Route path=':id' element={<EditUser />} />
                            <Route path='newUser' element={<NewUserForm />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App