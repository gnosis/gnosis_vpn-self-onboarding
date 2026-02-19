import React from 'react';
import styled, { css } from 'styled-components';
import { ArrowRight } from 'lucide-react';

// --- Styled Components ---

const sharedStyles = css`
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
  text-decoration: none;

  /* Typography */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;

  /* Interaction Props */
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;

  /* --- Hover State --- */
  &:hover {
    background-color: #E6E4DC;
    transform: translateY(-1px);

    svg {
      transform: translateX(6px);
    }
  }

  /* --- Active / Click State --- */
  &:active {
    background-color: #D9D7CF;
    transform: translateY(4px);
    border-bottom-width: 0px;
    margin-bottom: 4px;
  }

  /* --- Focus State for Accessibility --- */
  &:focus-visible {
    outline: 2px solid black;
    outline-offset: 4px;
  }
`;

const ButtonWrapper = styled.button`
  ${sharedStyles}
`;

const AnchorWrapper = styled.a`
  ${sharedStyles}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
`;

// --- Component Definition ---

type ButtonGrayCtaProps = {
  label?: string;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
} & (
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
  );

const ButtonGrayCta: React.FC<ButtonGrayCtaProps> = ({
  label = "Onboard now",
  className,
  href,
  ...props
}) => {
  const content = (
    <>
      <IconWrapper>
        <ArrowRight size={16} strokeWidth={2} />
      </IconWrapper>
      <span>{label}</span>
    </>
  );

  const cn = `ButtonGrayCta${className ? ` ${className}` : ""}`;

  if (href) {
    return (
      <AnchorWrapper className={cn} href={href} target="_blank"
        rel="noreferrer noopener" {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </AnchorWrapper>
    );
  }

  return (
    <ButtonWrapper className={cn} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </ButtonWrapper>
  );
};

export default ButtonGrayCta;
