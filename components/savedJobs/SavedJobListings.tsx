import styles from "../../styles/savedJobs.module.css"
import SavedJobSection from "./SavedJobSection"
import { useAuth } from "../auth/AuthUserProvider"

//main component (container)
const SavedJobListings = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <h2> Please sign in to post! </h2>
    )
  }
  else {
    if (user) {
      return (
        <SavedJobSection />
      )
    }
    else {
      return (
        <h2 className={styles.loggedOut}> Please sign in to view saved jobs! </h2>
      )
    }
  }

}

export default SavedJobListings