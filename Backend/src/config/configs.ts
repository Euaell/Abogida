import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'
const MONGO_DB = process.env.MONGO_DB || 'test'

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || ''
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || ''
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || ''

const EMAIL = process.env.EMAIL || ''
const PASSWORD = process.env.PASSWORD || ''

const JWT_SECRET = process.env.JWT_SECRET || ''
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || ''


export default {
	PORT,
	HOST,
	MONGO_URI,
	MONGO_DB,
	CLOUDINARY_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	EMAIL,
	PASSWORD,
	JWT_SECRET,
	JWT_EXPIRES_IN
}