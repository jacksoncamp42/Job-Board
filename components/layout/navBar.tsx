import React from "react"
import Link from "next/link"
import styles from "../../styles/Navbar.module.css"
import { Button } from "@chakra-ui/react"
import { signInWithGoogle } from "../../util/firebase"
import { useAuth } from "../auth/AuthUserProvider"


type NavLink = {
  path: string,
  name: string
}

const Navbar = () => {
  const { user, signOut } = useAuth()
  return (
    <header>
      <nav >
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/">
              <a className={styles.lia}>ALL JOBS</a>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/savedJobs">
              <a className={styles.lia}>SAVED</a>
            </Link>
          </li>



          <li className={styles.li}>
            <Link href="/addListings">
              <a className={styles.lia}>+ ADD LISTING</a>
            </Link>
          </li>
          <li className={styles.liright}>

            <Button className={styles.liaright}
              onClick={user ? signOut : signInWithGoogle}> {user ? "LOG OUT" : "LOG IN"} </Button>


          </li>
        </ul>

      </nav>

    </header>)
}

export default Navbar

function getAuth(app: any) {
  throw new Error("Function not implemented.");
}
