export default class LoadingError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(`${message}`);
    this.status = status;
    this.statusText = statusText;
  }
}
