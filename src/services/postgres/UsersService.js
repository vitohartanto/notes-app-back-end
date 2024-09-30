const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { nanoid } = require('nanoid');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  addUser = async ({ username, password, fullname }) => {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
  };

  verifyNewUsername = async (username) => {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(
        'Gagal menambahkan user. Username sudah digunakan'
      );
    }
  };
}

module.exports = UsersService;
