import user from "../models/usermodel.js";
import path from "path"
import fs from "fs"

export const getUsers = async (req, res) => {
    try {
        const response = await user.findAll()
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await user.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" })
    const nama = req.body.nama
    const gender = req.body.gender
    const tindakan = req.body.tindakan
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedType = ['.png', '.jpg', '.jpeg']

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image" })

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" })

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message })
        try {
            await user.create({
                nama: nama,
                gender: gender,
                tindakan: tindakan,
                image: fileName,
                url: url
            })
            res.status(201).json({
                msg: "Data berhasil di tambahkan"
            })
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateUser = async (req, res) => {
    const User = await user.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!User) return res.status(404).json({ msg: "No Data Found" })
    let fileName = ""
    if (req.files === null) {
        fileName = User.image
    } else {
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + ext
        const allowedType = ['.png', '.jpg', '.jpeg']

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Image" })

        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" })

        const filepath = `./public/images/${User.image}`
        fs.unlinkSync(filepath)

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message })
            
        })
    }
    
    const nama = req.body.nama
    const gender = req.body.gender
    const tindakan = req.body.tindakan
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`

    try {
        await user.update({
            nama: nama,
            gender: gender,
            tindakan: tindakan,
            image: fileName,
            url: url
        },
        {
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Data Berhasil Di Perbarui" })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {

    const User = await user.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!User) return res.status(404).json({ msg: "No Data Found" })
    try {
        const filepath = `./public/images/${User.image}`
        fs.unlinkSync(filepath)
        await user.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Data Berhasil Di Hapus" })
    } catch (error) {
        console.log(error.message);
    }
}