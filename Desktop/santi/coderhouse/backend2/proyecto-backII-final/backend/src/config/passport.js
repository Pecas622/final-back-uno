import passport from 'passport'
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import { validatePassword, hashPassword } from '../utils/bcrypt.js'
import userModel from '../models/users.models.js'
import jwt from 'passport-jwt'
import dotenv from 'dotenv'

dotenv.config() // Carga las variables de entorno

const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = (req) => {
    let token = null
    if (req.cookies) {
        token = req.cookies['Pecas622'] 
    }
    return token
}

const initializatePassword = () => {

    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, age } = req.body
            const newUser = await userModel.create({
                first_name,
                last_name: last_name.trim() || " ", 
                email,
                password: hashPassword(password),
                age
            })
            return done(null, newUser)
        } catch (e) {
            console.error(e)
            return done(e)
        }
    }))

    passport.use('login', new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username })

            if (!user) {
                return done(null, false, { message: "Usuario no encontrado" })
            }

            if (validatePassword(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Contraseña incorrecta" })
            }

        } catch (e) {
            console.error(e)
            return done(e)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile._json.email })

            if (!user) {
                user = await userModel.create({
                    first_name: profile._json.name,
                    last_name: " ", 
                    email: profile._json.email,
                    password: hashPassword(process.env.DEFAULT_PASSWORD), 
                    age: 18
                })
            }

            done(null, user)

        } catch (e) {
            console.error(e)
            done(e)
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (e) {
            console.error(e)
            return done(e)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (e) {
            console.error(e)
            done(e)
        }
    })
}

export default initializatePassword
