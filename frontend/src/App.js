import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UserList from './features/users/UsersList';
import NewUserForm from './features/users/NewUserForm';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Public />} />
                <Route path='login' element={<Login />} />

                {/* protected route */}
                <Route path='dash' element={<DashLayout/>} >
                    <Route index element={<Welcome />} />
                    <Route path='notes'>
                        <Route index element={<NotesList />} />
                    </Route>
                    <Route path='users'>
                        <Route index element={<UserList />} />
                        <Route path='newUSer' element={<NewUserForm />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App