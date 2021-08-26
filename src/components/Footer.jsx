/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "@emotion/react";
import { Layout } from "antd";
import Typography from "./Typography";

const links = [
  {
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/tiavina-michael-ralainirina"
  },
  {
    text: "GitHub",
    url: "https://github.com/tiavina-mika"
  },
  {
    text: "YouTube",
    url: "https://www.youtube.com/channel/UC0CfOprE7AOXQqeFhS2XUIQ"
  }
];

const classes = {
  footer: (theme) => ({
    backgroundColor: theme.colors.dark,
    height: "15vh"
  }),
  linkContainer: {
    margin: 10
  },
  links: {
    margin: -10
  },
  link: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 1,
    textDecoration: "underline"
  },
  name: {
    fontSize: "14px !important",
    fontWeight: "normal",
    letterSpacing: 1.1
  }
};

const Footer = () => {
  return (
    <Layout.Footer css={classes.footer} className="flexCenter stretchSelf">
      <div className="flexCenter flex1">
        <div css={classes.links} className="flexRow justifyCenter flex1">
          {links.map((link, index) => (
            <div css={classes.linkContainer} key={index}>
              <a href={link.url} css={classes.link}>
                {link.text}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="flexCenter flex1 m-t-20">
        <Typography theme="light" css={classes.name}>
          By Tiavina Michael RALAINIRINA
        </Typography>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
