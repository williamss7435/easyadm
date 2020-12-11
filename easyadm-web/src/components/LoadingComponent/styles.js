import styled, {keyframes} from 'styled-components';

import {MdAutorenew} from 'react-icons/md';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const IconLoading = styled(MdAutorenew)`
    animation: ${rotate} 2s linear infinite;
`;

export const Container = styled.div`
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    top: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

`;