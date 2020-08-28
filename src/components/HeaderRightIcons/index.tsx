import React from 'react';

import { Container } from './styles';

type HeaderRightIconsProps = {
  leftSideButton?: () => JSX.Element;
  rightSideButton?: () => JSX.Element;
};

const HeaderRightIcons: React.FC<HeaderRightIconsProps> = ({
  leftSideButton,
  rightSideButton,
}: HeaderRightIconsProps) => {
  return (
    <>
      <Container>
        {leftSideButton ? leftSideButton() : null}

        {rightSideButton ? rightSideButton() : null}
      </Container>
    </>
  );
};

export default HeaderRightIcons;
