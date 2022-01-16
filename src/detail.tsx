import React from "react";
import { Link, useParams } from "react-router-dom";
import { useListContext } from "./contexList";

export const DetailPage: React.FC = () => {
  const { id } = useParams();
  const { list } = useListContext();
  console.log(list);
  const member = list.find((member) => member.login === id);
  const { avatar_url, login } = member;
  return (
    <>
      <h2>Hello from Detail page</h2>
      <img src={avatar_url}></img>
      <p>name:{login}</p>
      <Link to="/list">Back to list page</Link>
    </>
  );
};
