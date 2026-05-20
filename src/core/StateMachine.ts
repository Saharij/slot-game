export type State = "idle" | "spinning" | "win" | "lose";

type Transition = {
  from: State;
  to: State;
  action: () => void;
};

export class StateMachine {
  private _current: State = "idle";
  private _transitions: Transition[] = [];

  get current(): State {
    return this._current;
  }

  addTransition(from: State, to: State, action: () => void): this {
    this._transitions.push({ from, to, action });
    return this;
  }

  transition(to: State): void {
    const t = this._transitions.find(
      (t) => t.from === this._current && t.to === to,
    );

    if (!t) {
      console.warn(`No transition from ${this._current} to ${to}`);
      return;
    }

    this._current = to;
    t.action();
  }
}
