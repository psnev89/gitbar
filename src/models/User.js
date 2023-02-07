/**
 * USER READ MODEL
 */

export default class Repository {
  #id;
  #username;
  #email;

  constructor(id, email, username) {
    this.#id = id;
    this.#email = email;
    this.#username = username;
  }

  get Id() {
    return this.#id;
  }

  get UserName() {
    return this.#username;
  }

  get DisplayName() {
    if (this.#username) return this.UserName;
    return this.#email.substring(0, this.#email.indexOf("@"));
  }

  get Email() {
    return this.#email;
  }
}
