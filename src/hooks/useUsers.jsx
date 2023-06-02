import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/admin/users`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      return res.json();
    },
  });
  return [users, isLoading, refetch];
};

export default useUsers;
