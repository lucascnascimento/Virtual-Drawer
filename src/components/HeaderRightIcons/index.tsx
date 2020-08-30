import React from 'react';

import { Container } from './styles';

type HeaderRightIconsProps = {
  leftSideButton?: () => JSX.Element;
  rightSideButton?: () => JSX.Element;
};

/**
 * Renders two components to be positioned on the header
 * @param leftSideButton Component to be rendered on the left side
 * @param rightSideButton Component to be rendered on the right side
 */
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
