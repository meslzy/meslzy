import Mustache from "mustache";
import axios from "axios";

import path from "node:path";
import fs from "node:fs";

const data = async () => {
  const getUpdateDate = () => {
    return new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  };

  const getChessStats = () => {
    const url = "https://lichess.org/api/user/meslzy";
    return axios.get(url).then((response) => response.data).then((data) => {
      return {
        bullet: {
          rating: data.perfs.bullet.rating,
        },
        blitz: {
          rating: data.perfs.blitz.rating,
        },
        rapid: {
          rating: data.perfs.rapid.rating,
        },
      };
    });
  };

  return {
    name: "Meslzy",
    username: "meslzy",
    socialMedia: {
      website: "https://meslzy.com/",
      twitch: "https://twitch.tv/meslzy",
      twitter: "https://twitter.com/meslzy",
      instagram: "https://instagram.com/meslzy"
    },
    updateDate: getUpdateDate(),
    chessStats: await getChessStats(),
  };
};

const template = () => {
  const templatePath = path.join(process.cwd(), "static", "readme.mustache");
  return fs.readFileSync(templatePath, "utf8");
};

const output = Mustache.render(template(), await data());
fs.writeFileSync("readme.md", output);