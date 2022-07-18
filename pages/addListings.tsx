import AddListing from "../components/addListings/AddListing";
import AuthUserProvider, { useAuth } from "../components/auth/AuthUserProvider";
import Layout from "../components/layout/Layout";


const AddListingsPage = () => (

  <AuthUserProvider>
    <Layout title="Add Listings" >
      <AddListing />
    </Layout>
  </AuthUserProvider>

)


export default AddListingsPage