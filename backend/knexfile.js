// Update with your config settings.

module.exports = {

    development: {
      client: 'postgresql',
      connection: 'postgres://yqtpjaod:vqg1Y0YyDUr-B832xmNi1ZUVxpsPIwZ-@drona.db.elephantsql.com:5432/yqtpjaod',
      
    },
  
    staging: {
      client: 'postgresql',
      connection: 'postgres://yqtpjaod:vqg1Y0YyDUr-B832xmNi1ZUVxpsPIwZ-@drona.db.elephantsql.com:5432/yqtpjaod',
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: 'postgres://yqtpjaod:vqg1Y0YyDUr-B832xmNi1ZUVxpsPIwZ-@drona.db.elephantsql.com:5432/yqtpjaod',
      pool: {
        min: 0,
        max: 100
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
      }
    }
  
  };
  
  