import React from 'react';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';

// --- Styled Components ---

const ButtonWrapper = styled.button`
  /* Core Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  /* Visual Style - Matching the Image */
  background-color: #F0EFE9; /* Beige tone */
  color: #000000;
  border: none;
  border-bottom: 3px solid #000000; /* The thick black underline/depth */

  /* Typography */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px; /* Large, readable text */
  font-weight: 400; /* Regular weight like the screenshot */
  line-height: 1;

  /* Interaction Props */
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;

  /* --- Hover State --- */
  &:hover {
    background-color: #E6E4DC; /* Slightly darker beige */
    transform: translateY(-1px); /* Subtle lift */

    /* Target the icon specifically on hover */
    svg {
      transform: translateX(6px); /* Slide arrow forward */
    }
  }

  /* --- Active / Click State --- */
  &:active {
    background-color: #D9D7CF;
    transform: translateY(4px); /* Moves down to simulate being pressed */
    border-bottom-width: 0px; /* "Collapses" the 3D depth */
    margin-bottom: 4px; /* Maintains layout stability so it doesn't jump */
  }

  /* --- Focus State for Accessibility --- */
  &:focus-visible {
    outline: 2px solid black;
    outline-offset: 4px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
`;

// --- Component Definition ---

interface OnboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const OnboardButton: React.FC<OnboardButtonProps> = ({
  label = "Onboard now",
  className,
  ...props
}) => {
  return (
    <ButtonWrapper className={`OnboardButton${className ? ` ${className}` : ""}`} {...props}>
      <IconWrapper>
        <ArrowRight size={16} strokeWidth={2} />
      </IconWrapper>
      <span>{label}</span>
    </ButtonWrapper>
  );
};

export default OnboardButton;