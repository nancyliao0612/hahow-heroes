import { useHeroesContext } from "../context/hero_context";
import styled from "styled-components";

function PointCounter({ value, point }) {
  const { addPoints, minusPoints, remain_point } = useHeroesContext();

  return (
    <Wrapper>
      <span>{point}</span>
      <button
        type="button"
        onClick={addPoints}
        name={point}
        data-point={value}
        disabled={remain_point === 0 ? true : false}
      >
        +
      </button>
      <span>{value}</span>
      <button
        type="button"
        onClick={minusPoints}
        name={point}
        data-point={value}
        disabled={value === 0 ? true : false}
      >
        -
      </button>
    </Wrapper>
  );
}

export default PointCounter;

const Wrapper = styled.div`
  margin-bottom: 2rem;

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
`;
