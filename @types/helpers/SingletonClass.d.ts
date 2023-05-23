export default class SingletonClass {
    protected static _instance: any;
    protected constructor();
    static getInstance<T = any>(): T;
}
