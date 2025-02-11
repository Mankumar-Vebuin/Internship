import {TYPE_ENV} from '../../domain/models/env'
import dotenv from 'dotenv'
import { getNumber, getString } from '../datatype'

dotenv.config()

export const env: TYPE_ENV = {
    PORT: getNumber("PORT"),
    HOST: getString("HOST"),
    DB_USER: getString("DB_USER"),
    DB_PASSWORD: getString("DB_PASSWORD"),
    DB: getString("DB"),
    DB_PORT: getNumber("DB_PORT")
}