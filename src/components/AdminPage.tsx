import React, { FC, useEffect, useState } from 'react'
import IUser from '../type/Types'
import Pagination from './Pagination'


type UserProps = {
  users: IUser[]
  deleteUser: (id: number) => void
  setUserForEdit: (user: IUser) => void
  countVisibleUser: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  handleThClick: (event: React.MouseEvent<HTMLElement>) => void
}

const AdminPage: FC<UserProps> = ({ users, deleteUser, setUserForEdit, countVisibleUser, setCurrentPage, handleThClick }) => {





  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={(event) => handleThClick(event)}>First Name</th>
            <th onClick={(event) => handleThClick(event)}>Last Name</th>
            <th onClick={(event) => handleThClick(event)}>Email</th>
            <th onClick={(event) => handleThClick(event)}>Gender</th>
            <th onClick={(event) => handleThClick(event)}>IP Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                {user.firstName}
              </td>
              <td>
                {user.lastName}

              </td>
              <td>
                {user.email}

              </td>
              <td>
                {user.gender}

              </td>
              <td>
                {user.ipAddress}
              </td>
              <td><button onClick={() => setUserForEdit(user)}>Edit</button></td>
              <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table >
    </>

  )
}

export default AdminPage
