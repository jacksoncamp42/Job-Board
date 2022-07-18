import SavedJobItem from "./SavedJobItem"
import { Job, JobWithId } from "../../types/index"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "../../styles/savedJobs.module.css"
import Grid from "@material-ui/core/Grid"
import { Container } from "@material-ui/core"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useAuth } from "../auth/AuthUserProvider"
import { db } from "../../util/firebase"


const SavedJobSection = () => {

  const jobsCollectionRef = collection(db, 'jobs')
  const { user } = useAuth()
  const [savedJobs, setSavedJobs] = useState<JobWithId[]>([])


  const savedJobQuery = query(jobsCollectionRef, where('saver', '==', user!.uid))

  useEffect(() => {
    const unsubscribe = onSnapshot(savedJobQuery, (querySnapshot) => {
      setSavedJobs(querySnapshot.docs.map((doc) => ({ ...doc.data() as Job, id: doc.id })))
    })
    return unsubscribe
  }, [savedJobQuery])

  return (
    savedJobs.length !== 0 ?
      <Container style={{ marginTop: 30 }}>
        <Grid container spacing={6} >
          {savedJobs.map((saved_job) => (
            <Grid item key={saved_job.id} xs={12} md={6} lg={4}>
              <SavedJobItem key={saved_job.id} job={saved_job} savedJobs={savedJobs} setSavedJobs={setSavedJobs} />
            </Grid>
          ))}
        </Grid >
      </Container > : <h2 className={styles.nothingSaved}> You have nothing saved! </h2>
  )
}

export default SavedJobSection
