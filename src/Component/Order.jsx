
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
 function Order() {
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log("Order Page Loaded, user:", user);
    }, []);

    return <div>Order Page</div>;
}
export default Order;