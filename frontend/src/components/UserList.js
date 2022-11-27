/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const UserList = () => {

    const [users, setUser] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users")
        setUser(response.data)
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`)
            getUsers()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to={`tambah`} className="button is-success">
                    Tambah
                </Link>
                <table className='table is-striped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Gender</th>
                            <th>Tindakan</th>
                            <th>Bukti</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.nama}</td>
                                <td>{user.gender}</td>
                                <td>{user.tindakan}</td>
                                <td>
                                    <a href={user.url} target="_blank" rel="">Bukti</a>
                                </td>
                                <td>
                                    <Link to={`edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                                    <button onClick={()=> deleteUser(user.id)} className='button is-small is-danger'>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList