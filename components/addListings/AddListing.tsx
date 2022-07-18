import React, { FormEventHandler, useState } from 'react';
import styles from '../../styles/addListings.module.css'
import { Job } from '../../types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../util/firebase';

import Typography from '@material-ui/core/Typography'
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import { FormControlLabel, makeStyles } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Radio from "@material-ui/core/Radio"
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { useAuth } from '../auth/AuthUserProvider';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  typography: {
    marginTop: 15,
    fontFamily: 'Helvetica',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }

})

//main component to add job listings 

const AddListing = () => {

  const { user, loading } = useAuth()

  const classes = useStyles()

  type inputformat = {
    position: string;
    type: string;
    employer: string;
    location: string;
    description: string;
  }

  const [input, setInput] = useState<inputformat>({
    position: "",
    type: "",
    employer: "",
    location: "",
    description: ""
  })

  const addJob: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (input.position.trim() === "" || input.type.trim() === "" || input.employer.trim() === "" || input.location.trim() === "" || input.description.trim() === "") return
    const job: Job = {
      position: input.position.trim(),
      type: input.type,
      employer: input.employer.trim(),
      location: input.location.trim(),
      description: input.description.trim(),
      poster: user!.uid,
      saver: ""
    }
    addDoc(collection(db, 'jobs'), job)

    setInput({
      position: "",
      type: "",
      employer: "",
      location: "",
      description: ""
    })
  }

  if (loading) {
    return (
      <h2> Please sign in to post! </h2>
    )
  }

  else {
    if (user) {
      return (
        <Container>

          <Typography className={classes.typography} variant="h5" color="primary" component="h2" gutterBottom> Add a Job Listing </Typography>
          <form noValidate autoComplete="off" onSubmit={addJob}>
            {input.position.length >= 20 ? <div className={styles.textOverflow}> Position must be 20 characters or less. </div> : null}
            <TextField
              className={classes.field}
              label="Position"
              variant="outlined"
              color="primary"
              fullWidth
              required
              onChange={(e) => setInput({ ...input, position: e.target.value })}
              value={input.position}
            />



            <FormControl className={classes.field}>
              <FormLabel>Job Type</FormLabel>
              <RadioGroup value={input.type} onChange={(e) => { setInput({ ...input, type: e.target.value }) }}>
                <FormControlLabel value="Full-time" control={<Radio color="primary" />} label="Full-time" />
                <FormControlLabel value="Part-time" control={<Radio color="primary" />} label="Part-time" />
                <FormControlLabel value="Internship" control={<Radio color="primary" />} label="Internship" />
                <FormControlLabel value="On-campus" control={<Radio color="primary" />} label="On-campus" />
              </RadioGroup>
            </FormControl>

            <TextField
              className={classes.field}
              label="Employer"
              variant="outlined"
              color="primary"
              fullWidth
              required
              onChange={(e) => setInput({ ...input, employer: e.target.value })}
              value={input.employer}
            />
            <TextField
              className={classes.field}
              label="Job Location"
              variant="outlined"
              color="primary"
              fullWidth
              required
              onChange={(e) => setInput({ ...input, location: e.target.value })}
              value={input.location}
            />
            {input.description.length >= 700 ? <div className={styles.textOverflow}> Description must be 700 characters or less. </div> : null}
            <TextField
              className={classes.field}
              label="Description"
              variant="outlined"
              color="primary"
              multiline
              rows={4}
              fullWidth
              required
              onChange={(e) => setInput({ ...input, description: e.target.value })}
              value={input.description}
            />
            <Button type='submit' color="primary" variant="contained" disabled={input.position.trim() === "" || input.position.length >= 20 || input.type.trim() === "" || input.employer.trim() === "" || input.location.trim() === "" || input.description.trim() === "" || input.description.length >= 700}>Submit</Button>
          </form>

        </Container >
      )
    }
    else {
      return (<h2 className={styles.notLoggedIn}> Please sign in to post! </h2>)
    }
  }

}

export default AddListing