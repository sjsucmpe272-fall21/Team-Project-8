import mysql from 'promise-mysql';
import uuid from 'uuid';

export interface User {
  id: string;
  email: string;
}



class UserModel {
  connection: Promise<mysql.Connection>;
  constructor() {
    this.connection = ensureUserDatabase();
  }
  
  async addUser(email: string, password: string): Promise<User | undefined> {
    const conn = await this.connection;
    const newUserId = uuid.v4();
    await conn.query(
      `INSERT INTO users (id, email, password) VALUES ('${newUserId}','${email}', '${password}')`
    );
    return this.getUser(newUserId);
  }

  async getUser(id: string): Promise<User | undefined> {
    const conn = await this.connection;
    const user = await conn.query(`SELECT id, email FROM users WHERE id='${id}'`);
    if (user.length === 0) {
      return undefined;
    }
    return user[0];
  }

  async authenticateUser(email: string, password: string): Promise<User | undefined> {
    const conn = await this.connection;
    const user = await conn.query(`
      SELECT id, email 
      FROM users 
      WHERE email='${email}' AND password='${password}'`
    );
    if (user.length === 0) {
      return undefined;
    }
    return user[0];
  }
}

async function ensureUserDatabase() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'testuser',
    password: 'password'
  });

  await connection.query('CREATE DATABASE IF NOT EXISTS user');
  await connection.changeUser({'database': 'user'});

  await connection.query(
    `CREATE TABLE IF NOT EXISTS users(
      id varchar(255) primary key, 
      email varchar(255) not null,  
      password varchar(255) not null,
      UNIQUE (email)
    )`
  );

  return connection; 
}

export const userModel = new UserModel()