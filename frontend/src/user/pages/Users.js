import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    { id: "u1", name: "Vignesh Natarajan", image: "", resumes: "2" },
  ];
  return <UsersList items={USERS}/>;
};

export default Users;
