import { Job, JobWithId } from "../../types/index"
import styles from "../../styles/savedJobs.module.css"
import { Dispatch, SetStateAction } from "react"
// import { IconButton } from "@chakra-ui/react"
import { BsBookmarkFill, BsBookmark } from "react-icons/bs"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../../util/firebase"

import Typography from '@mui/material/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core"
import { useAuth } from "../auth/AuthUserProvider"

type Props = {
  readonly job: JobWithId,
  readonly savedJobs: JobWithId[],
  readonly setSavedJobs: Dispatch<SetStateAction<JobWithId[]>>
}

const useStyles = makeStyles({

  "&:last-child": {
    paddingBottom: 0
  },
  "&&": {
    paddingTop: 0,
    paddingBottom: 0
  },
  "&&&": {
    height: 420
  },
  "&&&&": {
    paddingTop: 0,
    paddingRight: 0
  }
})

const SavedJobItem = ({ job: { position, type, employer, location, description, id, saver } }: Props) => {
  const { user } = useAuth()

  const saveJob = () => {
    updateDoc(doc(db, 'jobs', id), { saver: user!.uid })
  }

  const unsaveJob = () => {
    updateDoc(doc(db, 'jobs', id), { saver: "" })
  }

  const classes = useStyles()

  return (

    <div >
      <Card className={classes["&&&"]} elevation={3}>
        <CardHeader
          action={<CardActions className={classes["&&&&"]} disableSpacing>
            <IconButton onClick={saver !== user!.uid ? saveJob : unsaveJob}>
              {saver !== user!.uid ? <BsBookmark /> : <BsBookmarkFill />}
            </IconButton>
          </CardActions>
          }
          title={position}
          subheader={type}
          className={classes["&:last-child"]}
        />
        <CardContent className={classes["&&"]}>
          <div>
            <Typography color="textSecondary">
              {employer}
            </Typography>
            <Typography color="textSecondary">
              {location}
            </Typography>
          </div>
        </CardContent>
        <CardContent>
          <div>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </div>
        </CardContent>

        {/* <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{description}</Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    </div>

  )

}

export default SavedJobItem

