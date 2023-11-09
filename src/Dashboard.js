import { useQuery, gql } from "@apollo/client";
import styles from "./Dashboard.module.css";

// Define the GraphQL query
const GET_LAUNCHES = gql`
  query GetLaunchList {
    launchesPast(limit: 5) {
      mission_name
      launch_date_local
      links {
        article_link
        video_link
      }
    }
  }
`;

// The Dashboard component
const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1 className={styles.title}>SpaceX Launches</h1>
      <div className={styles.launchesContainer}>
        {data.launchesPast.map((launch) => (
          <div key={launch.mission_name} className={styles.card}>
            <h2>{launch.mission_name}</h2>
            <p>
              Launch Date:{" "}
              {new Date(launch.launch_date_local).toLocaleDateString("en-US")}
            </p>
            <a
              href={launch.links.video_link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Watch Video
            </a>
            {launch.links.article_link && (
              <a
                href={launch.links.article_link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Read Article
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
