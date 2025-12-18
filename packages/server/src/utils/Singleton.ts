export abstract class Singleton {
  private static _instance: any;

  static getInstance<T extends Singleton>(c: new () => T): T {
    if (!this._instance) this._instance = new (c as any)();

    return this._instance;
  }
}
