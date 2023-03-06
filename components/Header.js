import React from "react";
import { Menu } from "semantic-ui-react";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();

  return (
    <div>
      <Menu style={{ marginTop: "10px" }}>
        <a className="item" onClick={() => router.push("/")}>
          CampaignStarter
        </a>
        <Menu.Menu position="right">
          <a className="item" onClick={() => router.push("/")}>
            Campaigns
          </a>

          <a className="item" onClick={() => router.push("/campaigns/new")}>
            +
          </a>
        </Menu.Menu>
      </Menu>
      {props.children}
    </div>
  );
};

export default Header;