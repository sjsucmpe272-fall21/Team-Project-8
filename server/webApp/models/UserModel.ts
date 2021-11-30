import mysql from 'promise-mysql';
import uuid from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

import { connection } from '../../Database/Connection';

export interface User {
  id: string;
  email: string;
  name: string;
}



class UserModel {

  async addUser(email: string, password: string, name: string): Promise<User | undefined> {
    const conn = await connection;
    const newUserId = uuid.v4();

    console.log("Prehashed password: ", password)
    await conn.query(
      `INSERT INTO owner (id, email, password, name) 
       VALUES ('${newUserId}','${email}', '${password}', '${name}')`
    );
    return this.getUser(newUserId);
  }

  async getUser(id: string): Promise<User | undefined> {
    const conn = await connection;
    const user = await conn.query(`SELECT id, email, name FROM owner WHERE id='${id}'`);
    if (user.length === 0) {
      return undefined;
    }
    return user[0];
  }

  async authenticateUser(email: string, password: string): Promise<User | undefined> {
    const conn = await connection;
    const user = await conn.query(`
      SELECT id, email, password, name
      FROM owner 
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

// async function ensureUserDatabase() {
//   const connection = await mysql.createConnection(dbConfig);

//   await connection.query('CREATE DATABASE IF NOT EXISTS user');
//   await connection.changeUser({ 'database': 'user' });

//   await connection.query(
//     `CREATE TABLE IF NOT EXISTS owner(
//       id varchar(255) primary key, 
//       email varchar(255) not null,  
//       password varchar(255) not null,
//       name varchar(255) not null,
//       UNIQUE (email)
//     )`
//   );

//   return connection;
// }

export const userModel = new UserModel()