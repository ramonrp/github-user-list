import React from "react";
import { Link, generatePath } from "react-router-dom";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

const getMembers = (organization) => {
  return fetch(`https://api.github.com/orgs/${organization}/members`).then(
    (response) => response.json()
  );
};
export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [inputOrganization, setInputOrganization] = React.useState("lemoncode");

  React.useEffect(() => {
    getMembers(inputOrganization).then(setMembers);
  }, []);

  const handleChange = (e) => {
    setInputOrganization(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMembers(inputOrganization).then(setMembers);
  };

  return (
    <>
      <h2>Hello from List page</h2>
      <form onSubmit={handleSubmit}>
        <label>Organization</label>
        <input onChange={handleChange} value={inputOrganization}></input>
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
          {members.map((member) => (
            <tr>
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
