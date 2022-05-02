import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHeroesContext } from "../context/hero_context";
import Loading from "../components/Loading";
import success from "../components/Message";
import Button from "../components/Button";

function HeroProfile() {
  const { heroId } = useParams();
  const {
    fetchSingleHero,
    hero_ability,
    hero_ability_loading,
    isPointChanged,
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
            return <Button value={value} key={index} point={key} />;
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
  margin: 0 27rem;
  margin-top: 2rem;
  padding: 3rem 5rem;
  font-size: 1.8rem;
  background-color: var(--clr-primary-2);
  border-radius: 1.5rem;
  position: relative;
  min-width: 35rem;

  form {
    display: flex;
  }

  form > div {
    flex: 3;
  }

  div:last-of-type {
    margin-bottom: 0;
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
    }
    section {
      align-self: initial;
      margin-top: 2rem;
    }
  }
  @media screen and (max-width: 880px) {
    margin: 0 10%;
    margin-top: 2rem;
  }
`;

export default HeroProfile;
