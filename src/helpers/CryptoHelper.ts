import { compare, hash } from 'bcrypt';

export default class CryptoHelper {
  private _password: string;
  constructor(password: string) {
    this._password = password;
  }
  public getHashedStr(salt = 10): Promise<string> {
    return hash(this._password, salt);
  }
  public isMatching(hasedStr: string): Promise<boolean> {
    return compare(this._password, hasedStr);
  }
}
