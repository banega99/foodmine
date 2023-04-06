import { Router } from "express"
import { sample_users } from "../data"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { User, UserModel } from "../models/user.model"
import { HTTP_BAD_REQUEST } from "../constants/http_status"
import bcrypt from 'bcryptjs'

const router = Router()

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 1) {
            res.send("Seed is already done!")
            return
        }
        await UserModel.create(sample_users)
        res.send("Seed is done!")
}
))

router.post("/login", asyncHandler(
    async(req, res) => {
        const {email, password} = req.body // requ.body prepoznaje varijable i dodeljuje im vrednosti na osnovu naziva kljuca koji se podudara sa nazivom varijabli 
        const user = await UserModel.findOne({email}) // umesto body.email i body.password koristimo email i password koji smo definisali u prethodnoj liniji
    
        if(user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenResponse(user))
        }else {
            res.status(HTTP_BAD_REQUEST).send("Email or password is not valid")
        }
    }
))

router.post("/register", asyncHandler(
    async(req, res) => {
        const {name, email, password, address} = req.body 
        const user = await UserModel.findOne({email})
        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send('User already exists, please login!')
            return
        }   

        const encryptedPassword = await bcrypt.hash(password, 10)

        const newUser: User = {
            id: '',
            name: name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address: address,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser)
        res.send(generateTokenResponse(dbUser))

    }
))

router.get('/profile/:id', asyncHandler(
    async (req, res) =>{
        const id = req.params.id
        const user = await UserModel.findById(id)
        res.send(user)
    }))

const generateTokenResponse = (user: User) => {
    const token = jwt.sign({
        id: user.id, email:user.email, isAdmin:user.isAdmin
    }, "${process.env.TOKEN_SECRET}", {
        expiresIn:"30d"
    })
    
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    }
}

export default router