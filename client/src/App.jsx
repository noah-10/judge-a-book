import './App.css'
import { Outlet } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// create API endpoint
const httpLink = createHttpLink({
  uri: '/graphql'
});

// create middleware to attach tokens to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

// create Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// create App component
function App() {
  return (
    <ApolloProvider client={client}>
      <header>
        <Navbar />
      </header>
      <Outlet />
      <Footer />
    </ApolloProvider>
  )
}

// export App component
export default App
