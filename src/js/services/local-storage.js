class LocalStorage {
  constructor() {
    if (typeof LocalStorage.instance === "object") {
      return LocalStorage.instance;
    }
    this.prefix = "";
    LocalStorage.instance = this;
    return this;
  }

  setPrefix(prefix = "JS-Band") {
    this.prefix = `${prefix}-`;
  }

  getItems(list) {
    if (localStorage[`${this.prefix}${list}`]) {
      try {
        return JSON.parse(localStorage.getItem(`${this.prefix}${list}`));
      } catch (e) {
        console.error("Error while parsing.");
      }
    }
  }

  setItems(listType, list) {
    try {
      localStorage.setItem(`${this.prefix}${listType}`, JSON.stringify(list));
    } catch (e) {
      console.error("Error while parsing.");
    }
  }
}

export default new LocalStorage();
