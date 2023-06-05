import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const useMenu = () => {
  const { data: data = [], isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
        const res = await axios.get("http://localhost:3000/menu");
        return res.data;
    },
  });
  return [data, isLoading, refetch];
};

export default useMenu;
