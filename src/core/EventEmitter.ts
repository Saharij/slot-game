type Listener = (...args: unknown[]) => void;

export class EventEmitter {
  private _listeners: Record<string, Listener[]> = {};

  on(event: string, fn: Listener): this {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(fn);

    return this;
  }

  emit(event: string, ...args: unknown[]): void {
    (this._listeners[event] || []).forEach((fn) => fn(...args));
  }

  off(event: string, fn: Listener): void {
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter((f) => f !== fn);
    }
  }
}
