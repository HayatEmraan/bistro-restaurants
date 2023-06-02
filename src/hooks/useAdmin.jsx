import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosInstance] = useAxiosSecure();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosInstance.get("/api/admin/users");
      return res.data;
    },
  });
  return [isAdmin, isLoading];
};

export default useAdmin;
