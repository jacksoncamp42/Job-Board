import { JobWithId } from "../../types/index"
import styles from "../../styles/jobListings.module.css"
import React from 'react'
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../util/firebase"

import { BsBookmarkFill, BsBookmark } from "react-icons/bs"
import { DeleteIcon } from "@chakra-ui/icons"

import IconButton, { IconButtonProps } from "@material-ui/core/IconButton"
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from "@material-ui/core/CardActions"
import Collapse from '@material-ui/core/Collapse'
import { createMuiTheme, createTheme, styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { makeStyles, Paper } from "@material-ui/core"
import { HStack } from "@chakra-ui/react"
import { useAuth } from "../auth/AuthUserProvider"


// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));


type Props = {
  readonly job: JobWithId,
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


const JobItem = ({ job: { position, type, employer, location, description, saver, poster, id } }: Props) => {
  const { user } = useAuth()
  // const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const saveJob = () => {
    updateDoc(doc(db, 'jobs', id), { saver: user!.uid })
  }

  const unsaveJob = () => {
    updateDoc(doc(db, 'jobs', id), { saver: "" })
  }

  const deleteJob = () => {
    deleteDoc(doc(db, 'jobs', id))
  }

  const classes = useStyles()

  return (

    <div >
      <Card className={classes["&&&"]} elevation={3}>
        <CardHeader
          action={user ? poster === user!.uid ?
            <CardActions className={classes["&&&&"]} disableSpacing>
              <IconButton onClick={deleteJob}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={saver !== user!.uid ? saveJob : unsaveJob}>
                {saver !== user!.uid ? <BsBookmark /> : <BsBookmarkFill />}
              </IconButton>
            </CardActions>
            : <IconButton onClick={saver !== user!.uid ? saveJob : unsaveJob}>
              {saver !== user!.uid ? <BsBookmark /> : <BsBookmarkFill />}
            </IconButton>
            : null}
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



export default JobItem