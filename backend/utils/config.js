module.exports= {
  DEV:      process.env.production !== 'production' , 
  DEBUG:    process.env.DEBUG == 'express:*,app* ',
  HOT_REL:  process.env.HOT_RELOAD != "false",
  PORT:     process.env.PORT || '3001',
  DB_URI:   process.env.MONGO_URI,
  NOT_AUTH: Boolean(process.env.NOT_AUTH),
  TEST_ID:  process.env.TEST_ID
}