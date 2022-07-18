export type Job = {
  position: string,
  type: string,
  employer: string,
  location: string
  description: string,
  saver: string,
  poster: string
}

export type JobWithId = Job & {
  id: string
}
