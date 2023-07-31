export default class CommonUtils {
  static optimalObjectParams = (object?: any | any[]): any | any[] => {
    if (typeof object === 'string') {
      return object.replace(/ + /g, ' ').trim();
    }
    if (object instanceof Date) {
      return CommonUtils.dateToLocaleDate(object);
    }
    if (Array.isArray(object)) {
      return object.filter((item) => item !== undefined && item !== null && item !== '')
        .map(item => CommonUtils.optimalObjectParams(item));
    }
    if (typeof object === 'object') {
      Object.keys(object).forEach((k) => {
        if (
          CommonUtils.checkIsEmpty(object[k])
        ) {
          delete object[k];
        } else if (
          typeof object[k] === 'object' ||
          Array.isArray(object[k])
        ) {
          object[k] = CommonUtils.optimalObjectParams(object[k]);
        }
      });
    }
    return object;
  };

  static checkIsEmpty(obj: any): boolean {
    return obj === null ||
      obj === undefined ||
      (typeof obj === 'string' && obj.trim() === '')
      || (typeof obj === 'object' && Object.keys(obj).length === 0);
  }

  static dateToLocaleDate(date?: Date | string | number): string | undefined {
    if (typeof date === 'string') {
      return date;
    }
    if (typeof date === 'number') {
      date = new Date(date);
    }
    if (!date) {
      return undefined;
    }
    return date.toLocaleDateString('fr-CA');
  }

  public static getRandom(size: number): string {
    return `${Math.round(Math.random() * parseInt(`1${(1e15 + '').slice(-size)}`, 10))}`;
  }

  public static randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static removeAccents(str: string): string {
    if (!str) {
      return '';
    }
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  static getItem<K>(key: string): K | undefined {
    const userStr = localStorage.getItem(key);
    return !!userStr ? JSON.parse(userStr) : undefined
  }

  static setItem<K>(key: string, value: K | undefined): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  static clearItem(key: string): void {
    localStorage.removeItem(key);
  }

  // For example:
// generateSearchIndex("Nguyen Xuan Son")
// returns ["Ngu", "Nguy", "Nguye", "Nguyen", "Xua", "Xuan", "Son"]

  static partialSearchField(title: string): string[] {
    title = CommonUtils.removeAccents(title).toLowerCase();
    let temp: string[] = []
    const data: string[] = title.trim().split(' ');
    data.shift();
    data.forEach(word => {
      temp = temp.concat(CommonUtils.generateSearchIndexWord(word))
    })
    return temp
    // titlePartials.shift();
    // return titlePartials.filter((item) => !!item);
  }


  static generateSearchIndexWord(word: string): string[] {
    if (word.length == 0) {
      return []
    } else if (word.length <= 3) {
      return [word]
    } else {
      const ret = [];
      for (let i = 3; i <= word.length; i++) {
        ret.push(word.substring(0, i))
      }
      return ret
    }
  }

}
