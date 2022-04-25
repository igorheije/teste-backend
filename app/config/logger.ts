import winston from 'winston'

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
})

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
    level: 'debug',
  })
)

export default logger
