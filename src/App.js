import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DashBoard from "./Dashboard";
import LaunchesSearch from "./LaunchesSearch";
// Initialize the ApolloClient instance with the SpaceX GraphQL API endpoint
const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache()
});

// ApolloProvider wraps your React app and places the client on the context,
// which allows you to access it from anywhere in your component tree.
const App = () => (
  <ApolloProvider client={client}>
    <DashBoard />
    <LaunchesSearch />
  </ApolloProvider>
);

export default App;
