export default class Todo {
  constructor(readonly description: string, public done: boolean = false) {}

  toggleDone(todo: any) {
    this.done = !todo.done
  }
}