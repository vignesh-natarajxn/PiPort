import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Vignesh Natarajan",
      image:
        "https://preview.redd.it/vreph5xqwm311.jpg?auto=webp&s=c130c4e60ef9354cbbe15080a7fc51d521875bf5",
      portfolios: "2",
    },
    {
      id: "u2",
      name: "Yilong Musk",
      image:
        "https://pbs.twimg.com/media/EbbAWSuXQAIP3Vz?format=jpg&name=large",
      portfolios: "68",
    },
  ];
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  console.log(loadedUsers);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
