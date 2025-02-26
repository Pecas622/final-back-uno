import { connect } from "mongoose"

export const connectDB = async () => {
    try {
        console.log('base de datos conectada')
        return  await connect('mongodb://127.0.0.1:27017/miDB')        
    } catch (error) {
        console.log(error)
    }
}

