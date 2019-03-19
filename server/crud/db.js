import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// let connectionString = process.env.DATABASE_URL;
// Database connection String
let connectionString = "postgres://Frank:jfrank@127.0.0.1:5432/epicmail";

const usersTable = 'users';
const messageTable = 'message'


const getEmail = (email) => {
    return new Promise((resolve,reject)=>{
        const client = new Client(connectionString);
       client.connect()
       .then(()=>{
           const sql = `SELECT * FROM ${usersTable} WHERE email=$1`;
           const params = [email];
           client.query(sql,params)
           .then((result)=>{
                resolve(result.rows);
               client.end();
           }).catch((e)=>{
            reject(e);
           })
       }).catch((e)=>{
        reject(e);
       })
    })
  }

  const getMessageIds = (receiverid,senderid) =>{
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
         const sql = `SELECT * FROM ${messageTable} 
         WHERE (receiverid=$1 AND senderid=$2) OR (receiverid=$2 AND senderid=$1)`
         const params = [receiverid,senderid]
         client.query(sql,params)
         .then((result)=>{
             resolve(result.rows)
             client.end();
         }).catch((e)=>{
           reject(e)
         })
      }).catch((e)=>{
        reject(e)
      })
    })
  }


  const insertUsers = (firstName, lastName, email, password, token) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
        const sql = `INSERT INTO ${usersTable}(firstname,lastname,email,password,token)VALUES($1,$2,$3,$4,$5)`;
        const params = [firstName,lastName,email,password,token];
        client.query(sql,params)
        .then((result)=>{
             resolve(result.rows);
             client.end();
        }).catch((e)=>{
          reject(e)
        })
      }).catch((e)=>{
        reject(e);
      })
    })
  }

  const insertMessage = (receiverId, senderId, subject, message, status, createdOn) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
        const sql = `INSERT INTO ${messageTable}
        (receiverid,senderid,subject,message,status,createdon)VALUES($1,$2,$3,$4,$5,$6)`;
        const params = [receiverId,senderId,subject,message,status,createdOn];
        client.query(sql,params)
        .then((result)=>{
             resolve(result.rows);
             client.end();
        }).catch((e)=>{
          reject(e)
        })
      }).catch((e)=>{
        reject(e);
      })
    })
  }


  const clearTable = tableName => new Promise((resolve, reject) => {
  const client = new Client(connectionString);
  client.connect()
    .then(() => {
      let sql = `DELETE FROM ${tableName};`;
      if (tableName === usersTable) {
        sql = `DELETE FROM ${tableName} WHERE user_level != 2;`;
      }
      client.query(sql)
        .then((result) => {
          resolve(result.rowCount);
          client.end();
        })
        .catch(e => reject(e));
    }).catch(e => reject(e));
});




export{getEmail,insertUsers, getMessageIds, insertMessage}
