import { useSelector } from "react-redux";
import { userInfo } from "../Store/Slices/UserSlice";

function useUserInfo() {
	const user = useSelector(userInfo);
	return user;
}

export default useUserInfo ;
