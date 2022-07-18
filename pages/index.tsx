import type { NextPage } from 'next'
import React, { FormEventHandler, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import Layout from '../components/layout/Layout'
import JobListings from '../components/jobListings/JobListings';
import AuthUserProvider from '../components/auth/AuthUserProvider';
import { Job, JobWithId } from '../types';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../util/firebase';



//main page with all listings

const Home = () => {

  type inputformat = {
    positionOrEmployer: string;
    type: string;
    location: string;
  }

  const [input, setInput] = useState<inputformat>({
    positionOrEmployer: "",
    type: "All",
    location: ""
  })


  const [initialJobs, setInitialJobs] = useState<JobWithId[]>([])

  const jobsCollectionRef = collection(db, 'jobs')
  const jobQuery = query(jobsCollectionRef)

  useEffect(() => {
    const unsubscribe = onSnapshot(jobQuery, (querySnapshot) => {
      setInitialJobs(querySnapshot.docs.map((doc) => ({ ...doc.data() as Job, id: doc.id })))
    })
    return unsubscribe
  }, [jobQuery])

  const [filtered, setFiltered] = useState<JobWithId[]>([{ description: "", type: "", location: "", employer: "", position: "", id: "", poster: "", saver: "" }])

  // Search function
  const searchJob: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const posEmpInput = input.positionOrEmployer.trim().toLowerCase()
    const typeInput = input.type
    const locationInput = input.location.trim().toLowerCase()

    if (posEmpInput === "" && typeInput === "All" && locationInput === "") {
      setFiltered(initialJobs)
    }

    // 1: position/employer, type, location
    // 2: position/employer, type
    // 3: position/employer, location
    // 4: type, location
    // 5: position/employer
    // 6: type
    // 7: location
    if (posEmpInput !== "") {
      if (typeInput !== "All") {
        if (locationInput !== "") {
          // 1
          setFiltered(initialJobs.filter((job) => (job.position.toLowerCase() === posEmpInput || job.employer.toLowerCase() === posEmpInput) && (job.type === typeInput) && (job.location.toLowerCase() === locationInput)))
        }
        else { //empty location 
          // 2
          setFiltered(initialJobs.filter((job) => (job.position.toLowerCase() === posEmpInput || job.employer.toLowerCase() === posEmpInput) && (job.type === typeInput)))
        }
      }
      else { //empty type
        if (locationInput !== "") {
          // 3
          setFiltered(initialJobs.filter((job) => (job.position.toLowerCase() === posEmpInput || job.employer.toLowerCase() === posEmpInput) && (job.location.toLowerCase() === locationInput)))
        }
        else { //empty location 
          // 5
          setFiltered(initialJobs.filter((job) => (job.position.toLowerCase() === posEmpInput || job.employer.toLowerCase() === posEmpInput)))
        }
      }
    }

    else { //empty position/employer

      if (typeInput !== "All") {
        if (locationInput !== "") {
          // 4
          setFiltered(initialJobs.filter((job) => (job.type === typeInput) && (job.location.toLowerCase() === locationInput)))
        }
        else { //empty location
          // 6
          setFiltered(initialJobs.filter((job) => (job.type === typeInput)))
        }
      }
      else { // empty type
        if (locationInput !== "") {
          // 7
          setFiltered(initialJobs.filter((job) => (job.location.toLowerCase() === locationInput)))
        }
      }
    }

    setInput({
      positionOrEmployer: "",
      type: "All",
      location: ""
    })
  }

  return (

    <AuthUserProvider>
      <Layout title="Home">
        <div>

          <h1 className={styles.title}>Job Listings</h1>
          <form onSubmit={searchJob}>
            <div className={styles.container}>
              <div className={styles.search}>
                <input
                  name='search'
                  id='search'
                  type='search'
                  placeholder='Search for a position or company'
                  value={input.positionOrEmployer}
                  onChange={(e) => setInput({ ...input, positionOrEmployer: e.target.value })}
                />
                <button type="submit">Search</button>
              </div>

              <div className={styles.filter}>

                <label htmlFor='type'>Job Type: </label>
                <select name="type" id="type" onChange={(e) => setInput({ ...input, type: e.target.value })} value={input.type}>
                  <option value="All">All</option>
                  <option value="Full-time">Full-Time</option>
                  <option value="Part-time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="On-campus">On-Campus</option>
                </select>

                <label> Location: </label>
                <input
                  name='location'
                  id='location'
                  type="text"
                  placeholder='Location'
                  value={input.location}
                  onChange={(e) => setInput({ ...input, location: e.target.value })}
                />

              </div>

            </div>
          </form>
        </div>
        <JobListings filtered={filtered} />
      </Layout>
    </AuthUserProvider>
  )
}

export default Home
