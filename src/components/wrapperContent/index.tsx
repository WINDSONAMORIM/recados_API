import styled from "styled-components";
const bg = require('../../assets/images/bgHome.jpg')

export const WrapperContent = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
`
export const HomeContent = styled.main`
    width: 100vw;
    height: 100vh;
    background-image: url(${bg});
    background-size: cover;
`