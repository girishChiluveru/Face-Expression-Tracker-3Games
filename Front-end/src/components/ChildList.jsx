// import React from "react";
import { useNavigate } from "react-router-dom";

const ChildList = () => {
  const navigate = useNavigate();

  // Mock data of children (replace with an API call if needed)
  const children = ["Girish", "Rahul", "Ananya"];

  return (
    <div>
      <h1>Children</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Child Name</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => navigate(`/sessions/${child}`)}>
                  {child}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildList;
