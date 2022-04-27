import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function HeroProfile() {
  const { heroId } = useParams();

  const url = `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`;

  const fetchSingleHero = async () => {
    try {
      const response = await axios(url);
      const heroData = response.data;
      console.log(heroData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleHero();
  }, [heroId]);

  return <h1>Hero Profile</h1>;
}

export default HeroProfile;
