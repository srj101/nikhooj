import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const UserBio = ({ user }) => {
  return (
    <div className="user_bio">
      <div className="user_dp">
        {user?.dp?.url ? (
          <Avatar src={user?.dp.url} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </div>
      <div className="userName">{user?.name}</div>
      <div className="userEmail">{user?.email}</div>
      <div className="joinDate">
        Joined <span>{user?.joinDate.split("T")[0]}</span>
      </div>
      <div className="userLevel">Level {user?.level}</div>
    </div>
  );
};

export default UserBio;
