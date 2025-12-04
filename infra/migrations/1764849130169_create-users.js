exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    // For reference, Github limits usernames to 39 characters
    username: {
      type: "varchar(30)",
      noNull: true,
      unique: true,
    },

    // Why 254 in length? https://stackoverflow.com/a/1199238
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },

    // Why 60 in length? https://www.npmjs.com/package/bcrypt#hash-info
    password: {
      type: "varchar(60)",
      notNull: true,
    },

    // Why timestamptz (timestamp with timezone)? https://justatheory.com/2012/04/postgres-use-timemestamptz
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestamptz",
<<<<<<< HEAD
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    }
  })
=======
      default: pgm.func("now()"),
    },
  });
>>>>>>> 0a27d6a (feat: create user model and api/v1/users endpoint)
};

exports.down = false;
