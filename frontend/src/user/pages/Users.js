import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    { id: "u1", name: "Vignesh Natarajan", image: "https://preview.redd.it/vreph5xqwm311.jpg?auto=webp&s=c130c4e60ef9354cbbe15080a7fc51d521875bf5", portfolios: "2" },
    { id: "u2", name: "Yilong Musk", image: "https://pbs.twimg.com/media/EbbAWSuXQAIP3Vz?format=jpg&name=large", portfolios: "68" },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
