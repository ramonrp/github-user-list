import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export const DetailPage: React.FC = () => {
  const location = useLocation();
  const { inputOrganization } = location.state;
  const { id } = useParams();

  return (
    <>
      <h2>Hello from Detail page</h2>
      <h3>User Id: {id}</h3>
      <Link state={{ inputOrganization }} to="/list">
        Back to list page
      </Link>
    </>
  );
};
