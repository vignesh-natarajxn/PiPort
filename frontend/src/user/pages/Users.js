import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    { id: "u1", name: "Vignesh Natarajan", image: "", portfolios: "2" },
    { id: "u2", name: "Yilong Musk", image: "", portfolios: "68" },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
