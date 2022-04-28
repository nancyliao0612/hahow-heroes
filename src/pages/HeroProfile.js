import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHeroesContext } from "../context/hero_context";
import Loading from "../components/Loading";

function HeroProfile() {
  const { heroId } = useParams();
  const {
    fetchSingleHero,
    hero_ability,
    hero_ability_loading,
    isPointChanged,
    addPoints,
    minusPoints,
    remain_point,
    handleSave,
  } = useHeroesContext();

  const url = `https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`;

  useEffect(() => {
    fetchSingleHero(url, heroId);
  }, [heroId]);

  if (hero_ability_loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSave(e, url, hero_ability)}>
        {Object.keys(hero_ability).map((key, index) => {
          const value = hero_ability[key];
          return (
            <div key={index}>
              <span>{key}</span>
              <button
                type="button"
                onClick={addPoints}
                name={key}
                data-point={value}
                disabled={remain_point === 0 ? true : false}
              >
                +
              </button>
              <span>{value}</span>
              <button
                type="button"
                onClick={minusPoints}
                name={key}
                data-point={value}
                disabled={value === 0 ? true : false}
              >
                -
              </button>
            </div>
          );
        })}
        <section>
          <p>剩餘點數：{remain_point}</p>
          <button
            className="submit-btn"
            disabled={
              !isPointChanged ? true : remain_point === 0 ? false : true
            }
          >
            儲存
          </button>
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

  span {
    display: inline-block;
    text-align: center;
  }

  span:nth-child(1) {
    margin-right: 3rem;
    width: 3rem;
  }

  span:last-of-type {
    width: 3rem;
  }

  button:nth-child(n) {
    border-style: none;
    border-radius: 0.5rem;
    font-size: 2.4rem;
    color: var(--clr-primary-1);
    background: white;
    margin: 0 2rem;
    height: 5rem;
    width: 5rem;
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

  button:disabled {
    cursor: not-allowed;
    opacity: 55%;
  }
`;

export default HeroProfile;
