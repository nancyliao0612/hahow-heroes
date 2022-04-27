import styled from "styled-components";

function HeroCard(props) {
  const { id, name, image } = props;
  return (
    <Wrapper>
      <img src={image} alt="hero-image" />
      <h3>{name}</h3>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // border: solid 1px;
  padding: 5px;
  background: var(--clr-primary-3);

  img {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
  h3 {
    text-align: center;
    height: 30%;
    padding: 20px 0;
  }
`;

export default HeroCard;
