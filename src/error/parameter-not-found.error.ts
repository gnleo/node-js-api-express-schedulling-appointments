export class ParameterNotFoundError extends Error {
  statusCode?: number
  constructor(message: string, statusCode?: number){
    super(message)
    this.name = 'PARAMETER_NOT_FOUND'
    this.statusCode = statusCode
  }
}