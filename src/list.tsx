import React from "react";
import { Link, generatePath } from "react-router-dom";
import { MemberEntity } from "./entityModel";
import { useListContext } from "./contexList";
import { LoaderOptionsPlugin } from "webpack";
const getMembers = (organization) => {
  return fetch(`https://api.github.com/orgs/${organization}/members`).then(
    (response) => response.json()
  );
};
export const ListPage: React.FC = () => {
  const { input, setInput, list, setList } = useListContext();

  React.useEffect(() => {
    getMembers(input).then(setList);
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMembers(input).then(setList);
  };

  return (
    <>
      <h2>Hello from List page</h2>
      <form onSubmit={handleSubmit}>
        <label>Organization</label>
        <input onChange={handleChange} value={input}></input>
        <button>Search</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((member) => (
            <tr key={member.id}>
              <td>
                <img src={member.avatar_url} style={{ width: "5rem" }} />
              </td>
              <td>
                <span>{member.id}</span>
              </td>
              <td>
                <Link to={generatePath("/detail/:id", { id: member.login })}>
                  {member.login}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
