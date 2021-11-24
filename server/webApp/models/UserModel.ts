import mysql from 'promise-mysql';
import uuid from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

import { DEFAULT_SALT_ROUNDS } from '../../../shared/SupplierTypes';
const dbConfig = require('../config/database.json');

export interface User {
  id: string;
  email: string;
  name: string;
}



class UserModel {
  connection: Promise<mysql.Connection>;
  constructor() {
    this.connection = ensureUserDatabase();
  }
  
  async addUser(email: string, password: string, name: string): Promise<User | undefined> {
    const conn = await this.connection;
    const newUserId = uuid.v4();

    console.log("Prehashed password: ", password)
    await conn.query(
      `INSERT INTO users (id, email, password, salt, name) 
       VALUES ('${newUserId}','${email}', '${password}', '${password}', '${name}')`
    );
    return this.getUser(newUserId);
  }

  async getUser(id: string): Promise<User | undefined> {
    const conn = await this.connection;
    const user = await conn.query(`SELECT id, email, name FROM users WHERE id='${id}'`);
    if (user.length === 0) {
      return undefined;
    } 
    return user[0];
  }

  async authenticateUser(email: string, password: string):  Promise<User | undefined> {
    const conn = await this.connection;
    const user = await conn.query(`
      SELECT id, email, password, salt, name
      FROM users 
      WHERE email='${email}'`
    ); 
    console.log(email, password);
    if (user.length === 0) {
      return undefined;
    }
    const result = await bcrypt.compare(password, user[0].password);
    console.log("Result: ", result);
    if (result) { 
      return { 
        id: user[0].id,
        email,
        name: user[0].name 
      };
    } 
    return undefined;
  }
}

async function ensureUserDatabase() {
  const connection = await mysql.createConnection(dbConfig);

  await connection.query('CREATE DATABASE IF NOT EXISTS user');
  await connection.changeUser({'database': 'user'});

  await connection.query(
    `CREATE TABLE IF NOT EXISTS users(
      id varchar(255) primary key, 
      email varchar(255) not null,  
      salt varchar(255) not null,
      password varchar(255) not null,
      name varchar(255) not null,
      UNIQUE (email)
    )`
  );
 
  return connection; 
}

export const userModel = new UserModel()