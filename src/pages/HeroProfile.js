import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function HeroProfile() {
  const { heroId } = useParams();
  const [profile, setProfile] = useState("");

  const url = `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`;

  const fetchSingleHero = async () => {
    try {
      const response = await axios(url);
      const heroData = response.data;
      setProfile(heroData);
      console.log(heroData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleHero();
  }, [heroId]);

  const { str, int, agi, luk } = profile;

  return (
    <Wrapper>
      <div>
        <span>STR</span>
        <button>+</button>
        <span>{str}</span>
        <button>-</button>
      </div>
      <div>
        <span>INT</span>
        <button>+</button>
        <span>{int}</span>
        <button>-</button>
      </div>
      <div>
        <span>AGI</span>
        <button>+</button>
        <span>{agi}</span>
        <button>-</button>
      </div>
      <div>
        <span>LUK</span>
        <button>+</button>
        <span>{luk}</span>
        <button>-</button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  // border: solid 1px;
  margin-top: 2rem;
  padding: 2rem 3rem;
  font-size: 1.8rem;
  background-color: var(--clr-primary-3);

  div {
    margin-bottom: 2rem;
  }

  span:nth-child(1) {
    margin-right: 3rem;
    display: inline-block;
    width: 2rem;
  }

  button:nth-child(n) {
    border-style: none;
    border-radius: 0.5rem;
    font-size: 2.4rem;
    color: var(--clr-primary-1);
    margin: 0 2rem;
    height: 5rem;
    width: 5rem;
    border: solid 1px;
  }
`;

export default HeroProfile;
