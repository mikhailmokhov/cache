import * as dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: parseInt( process.env.PORT || '5000', 10),
    MEMORY_LIMIT: parseInt(process.env.MEMORY_LIMIT || '100026320', 10),
}