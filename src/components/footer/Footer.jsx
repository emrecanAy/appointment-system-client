import React from "react";
import "./footer.component.css";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="yanyana">
          <a href="/">
            <FacebookOutlined style={{ fontSize: "35px" }} />
          </a>
          <a href="/">
            <InstagramOutlined style={{ fontSize: "35px" }} />
          </a>
          <a href="/">
            <YoutubeOutlined style={{ fontSize: "35px" }} />
          </a>
          <a href="/">
            <TwitterOutlined style={{ fontSize: "35px" }} />
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href="/">
            <img style={{ maxWidth: "250px" }} src="img/logo/gc1.png" alt="" />
          </Link>
        </div>
        <div style={{ alignContent: "center" }}>
          Copyright © 2021 Glowcut - All rights reserved || Developer & Designed
          by @Emrecan Ay
        </div>
      </div>
    </footer>
  );
}

export default Footer;
