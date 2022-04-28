import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function HeroProfile() {
  const { heroId } = useParams();
  const [profile, setProfile] = useState("");
  const [remainPoint, setRemainPoint] = useState(0);

  const url = `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`;

  const fetchSingleHero = async () => {
    try {
      const response = await axios.get(url);
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

  // Increase single hero's point
  function addPoints(e) {
    let { name } = e.target;
    let { point } = e.target.dataset;
    if (remainPoint !== 0) {
      setProfile((prevPoint) => {
        return { ...prevPoint, [name]: Number(point) + 1 };
      });
      setRemainPoint((prevRemainPoint) => prevRemainPoint - 1);
    }
  }

  // Decrease single hero's point
  function minusPoints(e) {
    let { name } = e.target;
    let { point } = e.target.dataset;
    if (point > 0) {
      setProfile((prevPoint) => {
        return { ...prevPoint, [name]: Number(point) - 1 };
      });
      setRemainPoint((prevRemainPoint) => prevRemainPoint + 1);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(url, profile, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSave}>
        <div>
          <span>STR</span>
          <button type="button" onClick={addPoints} name="str" data-point={str}>
            +
          </button>
          <span>{str}</span>
          <button
            type="button"
            onClick={minusPoints}
            name="str"
            data-point={str}
          >
            -
          </button>
        </div>
        <div>
          <span>INT</span>
          <button type="button" onClick={addPoints} name="int" data-point={int}>
            +
          </button>
          <span>{int}</span>
          <button
            type="button"
            onClick={minusPoints}
            name="int"
            data-point={int}
          >
            -
          </button>
        </div>
        <div>
          <span>AGI</span>
          <button type="button" onClick={addPoints} name="agi" data-point={agi}>
            +
          </button>
          <span>{agi}</span>
          <button
            type="button"
            onClick={minusPoints}
            name="agi"
            data-point={agi}
          >
            -
          </button>
        </div>
        <div>
          <span>LUK</span>
          <button type="button" onClick={addPoints} name="luk" data-point={luk}>
            +
          </button>
          <span>{luk}</span>
          <button
            type="button"
            onClick={minusPoints}
            name="luk"
            data-point={luk}
          >
            -
          </button>
        </div>
        <section>
          <p>剩餘點數：{remainPoint}</p>
          <button className="submit-btn">儲存</button>
        </section>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  // border: solid 1px;
  margin-top: 2rem;
  padding: 2rem 3rem;
  font-size: 1.8rem;
  background-color: var(--clr-primary-3);
  position: relative;

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
    cursor: pointer;
  }

  section {
    position: absolute;
    // border: solid 1px;
    bottom: 3rem;
    right: 3rem;
  }

  section p {
    margin-bottom: 1rem;
  }

  section .submit-btn {
    font-size: 2rem;
    margin: 0;
    width: 20rem;
  }
`;

export default HeroProfile;
