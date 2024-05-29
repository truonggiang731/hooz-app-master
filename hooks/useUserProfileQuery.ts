import {UserService} from "@services";
import {useQuery} from "@tanstack/react-query";

export default function useUserProfileQuery() {
  const query = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: UserService.getProfile,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });

  return query;
}
