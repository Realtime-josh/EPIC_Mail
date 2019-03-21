import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// let connectionString = process.env.DATABASE_URL;
// Database connection String
let connectionString = "postgres://Frank:jfrank@127.0.0.1:5432/epicmail";

const usersTable = 'users';
const messageTable = 'message';
const groupsTable = 'group_table'
const groupsMembers = 'group_members'


const getUserEmail = (email) => {
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
      });
    });
  }

  const getMessagesById = (userId) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
         const sql = `SELECT message,subject FROM ${messageTable} WHERE receiverid=$1`
         const params = [userId];
         client.query(sql,params)
         .then((result)=>{
             resolve(result.rows);
             client.end();
         }).catch((e)=>{
           reject(e)
         })
      }).catch((e)=>{
        reject(e)
      });
    });
  }

  const getMessagesByUnread = (userId) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
         const sql = `SELECT message,subject,status FROM ${messageTable} WHERE receiverid=$1`
         const params = [userId];
         client.query(sql,params)
         .then((result)=>{
             resolve(result.rows);
             client.end();
         }).catch((e)=>{
           reject(e)
         })
      }).catch((e)=>{
        reject(e)
      });
    });
  }


  const getMessagesBySent = (userId) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
         const sql = `SELECT message,subject,createdon FROM ${messageTable} WHERE senderid=$1`
         const params = [userId];
         client.query(sql,params)
         .then((result)=>{
             resolve(result.rows);
             client.end();
         }).catch((e)=>{
           reject(e)
         })
      }).catch((e)=>{
        reject(e)
      });
    });
  }

  const getMessagesBySpecificId = (userId, messageId) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
         const sql = `SELECT message,subject,createdon FROM ${messageTable} WHERE (receiverid=$1 OR senderid=$1) AND messageid=$2`
         const params = [userId,messageId];
         client.query(sql,params)
         .then((result)=>{
             resolve(result.rows);
             client.end();
         }).catch((e)=>{
           reject(e)
         })
      }).catch((e)=>{
        reject(e)
      });
    });
  }

  const deleteBySpecificId = (userId, messageId) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
         const sql = `DELETE FROM ${messageTable} WHERE (receiverid=$1 OR senderid=$1) AND messageid=$2`
         const params = [userId,messageId];
         client.query(sql,params)
         .then((result)=>{
             resolve(result.rows);
             client.end();
         }).catch((e)=>{
           reject(e)
         })
      }).catch((e)=>{
        reject(e)
      });
    });
  }






  const insertMessage = (receiverid,senderid,subject,message,status,createdon) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
        const sql = `INSERT INTO ${messageTable}(receiverid,senderid,subject,message,status,createdon)VALUES($1,$2,$3,$4,$5,$6)`
        const params = [receiverid,senderid,subject,message,status,createdon]
        client.query(sql,params)
        .then((result)=>{
           resolve(result.rows)
           client.end();
        }).catch((e)=>{
          reject(e)
        })
      }).catch((e)=>{
        reject(e)
      });
    });
  }

  const insertGroupTable = (groupName,role,userId) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
        const sql = `INSERT into ${groupsTable}(group_name,role,user_id)VALUES($1,$2,$3)`
        const params = [groupName,role,userId]
        client.query(sql,params)
        .then((result)=>{
          resolve(result.rows)
          client.end();
        }).catch((e)=>{
          reject(e)
        })
      }).catch((e)=>{
        reject(e)
      });
    });
  }

  const insertGroupMembers = (userId,role,groupId,firstName,lastName) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
        const sql = `INSERT into ${groupsMembers}(user_id,role,group_id,first_name,last_name)VALUES($1,$2,$3,$4,$5)`
        const params = [userId,role,groupId,firstName,lastName]
        client.query(sql,params)
        .then((result)=>{
          resolve(result.rows)
          client.end();
        }).catch((e)=>{
          reject(e)
        })
      }).catch((e)=>{
        reject(e)
      });
    });
  }

  const getGroups = (userId) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
        const sql = `SELECT * FROM ${groupsTable} WHERE user_id=$1`
        const params = [userId]
        client.query(sql,params)
        .then((result)=>{
          resolve(result.rows)
          client.end();
        }).catch((e)=>{
          reject(e)
        })
      }).catch((e)=>{
        reject(e)
      });
    });
  }

  const deleteGroups = (userId, groupId) => {
    return new Promise((resolve,reject)=>{
      const client = new Client(connectionString);
      client.connect()
      .then(()=>{
        const sql = `DELETE FROM ${groupsTable} WHERE user_id=$1 AND group_id=$2`
        const params = [userId,groupId]
        client.query(sql,params)
        .then((result)=>{
          resolve(result.rows)
          client.end();
        }).catch((e)=>{
          reject(e)
        })
      }).catch((e)=>{
        reject(e)
      });
    });
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




export{
  getUserEmail,insertMessage,getMessagesById,insertUsers,
  getMessagesByUnread,getMessagesBySent,getMessagesBySpecificId,deleteBySpecificId,
  insertGroupTable, insertGroupMembers,getGroups, deleteGroups
}
