import React from "react";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const { state } = useLocation();
  return (
    <form>
      <div>
        <div>
          <strong>Name:</strong> {state.name}
        </div>
      </div>
    </form>
  );
};

export default UserDetails;
