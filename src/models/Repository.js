/**
 * REPOSITORY READ MODEL
 */

export default class Repository {
  #id;
  #fullName;
  #hyperlink;
  #bookmarked;

  constructor(id, fullName, hyperlink) {
    this.#id = id;
    this.#fullName = fullName;
    this.#hyperlink = hyperlink;
    this.#bookmarked = false;
  }

  get Id() {
    return this.#id;
  }

  get FullName() {
    return this.#fullName;
  }

  get Hyperlink() {
    return this.#hyperlink;
  }

  get IsBookmarked() {
    return !!this.#bookmarked;
  }
}
