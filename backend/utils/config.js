module.exports= {
  DEV:      process.env.production !== 'production' , 
  DEBUG:    process.env.DEBUG == 'express:*,app* ',
  HOT_REL:  process.env.HOT_RELOAD != "false",
  PORT:     process.env.PORT || '3001',
  DB_URI:   process.env.MONGO_URI,
  AUTH_ENABLE: process.env.AUTH_ENABLE || true
}