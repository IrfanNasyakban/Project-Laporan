import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {
const [nama, setnama] = useState("")
const [gender, setgender] = useState("Laki-laki")
const [tindakan, settindakan] = useState("")
const navigate = useNavigate()

const saveUser = async (e) => {
    e.preventDefault()
    try {
        await axios.post('http://localhost:5000/users', {
            nama,
            gender,
            tindakan
        })
        navigate("/")
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveUser}>
                <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input type="text" className="input" value={nama} onChange={(e) => setnama(e.target.value)} placeholder='Nama'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Gender</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select value={gender} onChange={(e) => setgender(e.target.value)}>
                                <option value="laki-laki">Laki-Laki</option>
                                <option value="perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tindakan</label>
                    <div className="control">
                        <input type="text" className="input" value={tindakan} onChange={(e) => settindakan(e.target.value)} placeholder='Tindakan'/>
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is-success'>Simpan</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser