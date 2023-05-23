/* eslint-disable @typescript-eslint/no-explicit-any */

export default // function SingletonClass<ClassType>(): ClassType =>
class SingletonClass {
  protected static _instance: any;
  protected constructor() {
    // declared the constructor as non public to have singleton
  }
  public static getInstance<T = any>(): T {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }
}
