import { JobWithId } from "../../types/index"
import JobSection from "./JobSection"


//main component (container)

type Props = {
  filtered: JobWithId[]
}

const JobListings = ({ filtered }: Props) => (
  <JobSection filtered={filtered} />
)


export default JobListings