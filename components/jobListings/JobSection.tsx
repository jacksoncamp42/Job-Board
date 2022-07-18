import JobItem from "./jobItem"
import { Job, JobWithId } from "../../types/index"
import styles from "../../styles/jobListings.module.css"
import Grid from "@material-ui/core/Grid"
import { Container } from "@material-ui/core"
import { db } from "../../util/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

type Props = {
  readonly filtered: JobWithId[]
}

const jobsCollectionRef = collection(db, 'jobs')
const jobQuery = query(jobsCollectionRef)

const JobSection = ({ filtered }: Props) => {

  const [jobs, setJobs] = useState<JobWithId[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(jobQuery, (querySnapshot) => {
      setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data() as Job, id: doc.id })))
    })
    return unsubscribe
  }, [])

  if (filtered.length !== 0 && filtered[0].description === "") {
    return (
      <Container style={{ marginTop: 30 }}>
        <Grid container spacing={6} >
          {jobs.map((job) => (
            <Grid item key={job.id} xs={12} md={6} lg={4}>
              <JobItem key={job.id} job={job} />
            </Grid>
          ))}
        </Grid >
      </Container >

    )
  }

  else {
    if (filtered.length !== 0) {
      return (
        <Container style={{ marginTop: 35 }}>
          <Grid container spacing={6} >
            {filtered.map((job) => (
              <Grid item key={job.id} xs={12} md={6} lg={4}>
                <JobItem key={job.id} job={job} />
              </Grid>
            ))}
          </Grid >
        </Container >
      )
    }
    else {
      return (
        <h2 className={styles.emptyJobText}>-- No such jobs exist --</h2>
      )
    }
  }

}

export default JobSection
