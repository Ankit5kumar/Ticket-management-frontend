import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const Team = () => {
  const baseurl = process.env.REACT_APP_BASE_URL;
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchteamData = useCallback(async () => {
    try {
      const token = Cookies.get("token");

      const response = await fetch(`${baseurl}/api/Team`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
return <div>no member added yet in the team</div>;
        // throw new Error("Network response was not ok");
      }
       
      const data = await response.json();
      setTeamData(data.members);
    } catch (err) {
      
      console.error("Error fetching team data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [baseurl]);

  useEffect(() => {
    fetchteamData();
  }, [fetchteamData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
console.log(teamData)
  return (
    <>
      <div>
        <h1>Members</h1>
        {teamData && teamData.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Username</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Mobile</th>
                {/* <th className="border border-gray-300 p-2">Address</th> */}
              </tr>
            </thead>
            <tbody>
              {teamData.map((member) => (
                <tr key={member._id}>
                  <td className="border border-gray-300 p-2">{member.username}</td>
                  <td className="border border-gray-300 p-2">{member.email}</td>
                  <td className="border border-gray-300 p-2">{member.name}</td>
                  <td className="border border-gray-300 p-2">{member.mobile}</td>
                  {/* <td className="border border-gray-300 p-2">{member.address}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )
        : (
            <div>Currently no members added into the Team</div>
          )}
        </div>
      </>
    );
  };
      
      

export default Team;