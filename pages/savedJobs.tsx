import React from 'react';
import AuthUserProvider, { useAuth } from '../components/auth/AuthUserProvider';
import Layout from '../components/layout/Layout';
import SavedJobListings from '../components/savedJobs/SavedJobListings';

//page with all saved jobs (saved attribute is true)


const SavedJobs = () => (
  <AuthUserProvider>
    <Layout title="Saved">
      <SavedJobListings />
    </Layout>
  </AuthUserProvider>
)


export default SavedJobs