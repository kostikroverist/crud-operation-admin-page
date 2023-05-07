import { useEffect, useState } from 'react'

import './App.css'

import axios from 'axios'
import IUser from './type/Types';
import AdminPage from './components/AdminPage';
import Form, { FormValues } from './components/Form';
import Pagination from './components/Pagination';

interface UserProps {
  user: IUser;
}
function App() {

  const [users, setUsers] = useState<IUser[]>([]);
  const [toggle, setToggle] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
  const [countVisibleUser, setCountVisibleUser] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState<string>('');
  const [isSort, setIsSort] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/users${text === '' ? '' : `?_sort=${text}`}`).then(response => {
      setUsers(response.data)
    })
      .catch(error => {
        console.error(error);
      });
  }, [text])

  const postUser = (values: FormValues) => {
    axios.post('http://localhost:3000/users', values)
      .then((response) => {
        const postUser = [...users, response.data]
        console.log(postUser)
        setUsers(postUser);
      })
      .catch(error => console.log(error));
  }

  const editUser = (id: number, values: FormValues) => {
    axios.put(`http://localhost:3000/users/${id}`, values).then((response) => {

      setUsers((pre => pre.map(user => {
        if (user.id === id) {
          return response.data;
        } return user;
      })))

    }).catch(error => console.log(error))
  }


  const deleteUser = (id: number) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(response => {
        const updateUsers = users.filter(user => user.id !== id);
        setUsers(updateUsers);
      })
      .catch(err => console.error(err))
  }
  const setUserForEdit = (user: IUser) => {
    setSelectedUser(user);
  }

  const viewAllUsers = (): void => {
    setToggle(!toggle)
  }
  const handleThClick = (event: React.MouseEvent<HTMLElement>) => {
    const str: string = event.currentTarget.innerHTML;
    const arrStr = str.split(' ');
    if (arrStr.length > 1) {
      const firstWord = arrStr[0].toLocaleLowerCase();
      const secondtWord = arrStr[1]
      const finalStr = firstWord.concat(secondtWord);
      setText(pre => pre === finalStr ? '' : finalStr)
    } else {
      setText(pre => pre === str.toLocaleLowerCase() ? '' : str.toLocaleLowerCase());
    }

  }

  const lastUserIndex = currentPage * countVisibleUser;
  const firstUserIndex = lastUserIndex - countVisibleUser;
  const currentUser = users.slice(firstUserIndex, lastUserIndex)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setValue(value);

  };
  const filteredUsers = value === '' ? currentUser : users.filter((item) =>
    item.lastName.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <>
      <div>
        <Form postUser={(values) => postUser(values)} editUser={(id, values) => editUser(id, values)} defaultUser={selectedUser} />
        <button onClick={viewAllUsers} >Vied All Users</button>

        {toggle ?
          <>
            <input type="text" className='input-search' placeholder='Search People' onChange={handleChange} />
            <AdminPage users={filteredUsers} deleteUser={(id) => deleteUser(id)} setUserForEdit={setUserForEdit}
              countVisibleUser={countVisibleUser} setCurrentPage={setCurrentPage} handleThClick={handleThClick} />
            {value === '' ? <Pagination count={countVisibleUser} totalUsers={users.length} setCurrentPage={setCurrentPage} />
              : ''}

          </>
          : ''
        }
      </div >
    </>
  )

}

export default App

