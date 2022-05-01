import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHeroesContext } from "../context/hero_context";
import Loading from "../components/Loading";
import success from "../components/Message";

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
        <div>
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
        </div>
        <section>
          <p>剩餘點數：{remain_point}</p>
          <button
            onClick={success}
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
  margin: 0 27rem;
  margin-top: 2rem;
  padding: 3rem 3rem;
  font-size: 1.8rem;
  background-color: var(--clr-primary-2);
  border-radius: 1.5rem;
  position: relative;

  form {
    display: flex;
  }

  form > div {
    flex: 3;
  }

  div {
    margin-bottom: 2rem;
  }
  div:last-of-type {
    margin-bottom: 0;
  }

  span {
    display: inline-block;
    text-align: center;
    text-transform: capitalize;
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
    background: var(--clr-primary-3);
    box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.1);
    margin: 0 2rem;
    height: 5rem;
    width: 5rem;
    cursor: pointer;
  }

  section {
    flex: 1;
    align-self: flex-end;
  }

  section p {
    margin-bottom: 1rem;
  }

  section .submit-btn {
    font-size: 2rem;
    margin: 0;
    width: 100%;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 30%;
  }

  @media screen and (max-width: 1100px) {
    form {
      flex-direction: column;
      justify-content: center;
      align-item: center;
    }
    section {
      align-self: initial;
      margin-top: 2rem;
    }
  }

  @media screen and (max-width: 880px) {
    margin: 0 10%;
    margin-top: 2rem;
    font-size: 1.4rem;

    button:nth-child(n) {
      width: 3rem;
      height: 3rem;
      font-size: 1.4rem;
    }

    form {
      flex-direction: column;
      justify-content: center;
      min-width: 300px;
    }

    section {
      width: 100%;
      margin-top: 3rem;
    }

    section .submit-btn {
      font-size: 1.4rem;
      margin: 0;
      width: 10rem;
    }
  }
`;

export default HeroProfile;
