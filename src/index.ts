import App from './app'
import config from './config/config'

const app = new App({
    port: config.PORT,
    memoryLimit: config.MEMORY_LIMIT
})

app.listen()

export default app