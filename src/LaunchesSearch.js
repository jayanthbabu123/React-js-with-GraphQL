import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

// Define the GraphQL query with a variable
const GET_LAUNCHES_BY_MISSION_NAME = gql`
  query GetLaunchesByMissionName($missionName: String!) {
    launchesPast(find: { mission_name: $missionName }) {
      mission_name
      launch_date_local
    }
  }
`;

// Component that fetches and displays the launches
const LaunchesSearch = () => {
  const [missionName, setMissionName] = useState("");
  const { data, loading, error } = useQuery(GET_LAUNCHES_BY_MISSION_NAME, {
    variables: { missionName },
    skip: !missionName // Skip the query if no mission name is entered
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Mission Name"
        value={missionName}
        onChange={(e) => setMissionName(e.target.value)}
      />
      {data && (
        <ul>
          {data.launchesPast.map((launch) => (
            <li key={launch.mission_name}>
              <strong>{launch.mission_name}</strong> -{" "}
              {new Date(launch.launch_date_local).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LaunchesSearch;
