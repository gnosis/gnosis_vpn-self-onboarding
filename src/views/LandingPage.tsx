import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  ArrowRight,
  MessageSquare,
  X,
  Github,
} from 'lucide-react';
import ButtonGrayCta from '../components/ButtonGrayCta';
import LogoutButton from '../components/onboarding/LogoutButton';
import { Button } from "@mui/material";
import { useAppStore } from '../store/appStore';
// --- Global Styles ---
const GlobalStyle = createGlobalStyle`

`;

// --- Styled Components ---

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  width: calc(100% - 48px);
`;

// Navbar
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;


const Logo = styled.img`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  font-weight: 500;

  a {
    text-decoration: none;
    color: #666;
    transition: color 0.2s;
    &:hover { color: black; }
  }
`;

// Hero Section
const HeroSection = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 60px;
`;

const HeroImageContainer = styled.div`
  width: 100%;
  height: 550px;
  background-color: #0f172a;
  position: relative;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(59, 130, 246, 0.2), transparent);
  pointer-events: none;
`;

const HoprBadge = styled.img`
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  width: 100px;
`;

const ContentBoxWrapper = styled.div`
  position: relative;
  z-index: 20;
  max-width: 1200px;
  margin: 0 auto;
  pointer-events: none;
`;

const ContentBox = styled.div`
  position: relative;
  background-color: white;
  width: calc(100% - 32px);
  max-width: 540px;
  padding: 16px 32px 16px 64px;
  margin-top: -170px;
  pointer-events: auto;

  h1 {
    font-size: 42px;
    font-weight: 300;
    margin: 0 0 8px 0;
    font-weight: 400;
  }

  h2 {
    font-size: 36px;
    font-weight: 400;
    color: #B5B5B5;
    margin: 0px 0px 24px;
    margin-top: -16px;
    margin-left: 32px;
  }


  .message {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-bottom: 24px;
    img {
      width: 72px;
      height: 72px;
      flex-shrink: 0;
      border-radius: 100px;
    }
  }

  p {
    font-size: 14px;
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  button {
    font-size: 36px;
    svg {
      width: 32px;
      height: 32px;
    }
  }

  .stair1 {
    position: absolute;
    width: 51px;
    height: 51px;
    background: white;
    top: 71px;
    right: -50px;
  }

  .stair2 {
    position: absolute;
    width: 101px;
    height: 51px;
    background: white;
    top: 120px;
    right: -100px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    width: 100%;
    max-width: calc(100% - 32px);
    margin-top: 0px;
    box-shadow: none;
    .stair1, .stair2 {
      display: none;
    }
  }
`;

// Features Section
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding: 40px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 400;
  margin: 0 0 32px 0;
`;

const IntroBlock = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  margin-left: 134px;

  p {
    font-size: 14px;
    color: #374151;
    max-width: 400px;
    line-height: 1.5;
  }
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-left: 134px;
`;

const StepItem = styled.div`
  display: flex;
  gap: 16px;
`;

const StepIconBox = styled.img`
  margin-top: 4px;
  background-color: black;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 4px 0;
  }
  p {
    font-size: 12px;
    color: #4b5563;
    line-height: 1.5;
    margin: 0;
  }
`;

// Footer CTA
const CtaBar = styled.div`
  background-color: #EDECE6;
  padding: 48px 0;
  text-align: center;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 30px;
    font-weight: 400;
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0;
    border-bottom: 4px solid black;
    transition: border-color 0.2s;

  /* --- Hover State --- */
  &:hover {
    background-color: #E6E4DC; /* Slightly darker beige */
    transform: translateY(-1px); /* Subtle lift */

    /* Target the icon specifically on hover */
    svg {
      transform: translateX(6px); /* Slide arrow forward */
    }
  }
  }
`;

// Main Footer
const Footer = styled.footer`
  background-color: black;
  color: white;
  padding: 32px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FooterLogo = styled.div`
  width: 32px;
  height: 32px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    }
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 10px;
  color: #9ca3af;

  .socials {
    display: flex;
    gap: 12px;
  }

  .links {
    display: flex;
    gap: 16px;
  }

  a, svg {
    color: #9ca3af;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
    &:hover { color: white; }
  }
`;

// --- Component ---

interface GnosisLandingProps {
  className?: string;
}

const GnosisLanding: React.FC<GnosisLandingProps> = ({ className }) => {
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const username = useAppStore((state) => state.username);
  const anonymous = useAppStore((state) => state.anonymous);

  return (
    <>
      <GlobalStyle />
      <div className={`GnosisLanding${className ? ` ${className}` : ""}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Navigation */}
        <NavContainer>
          <Nav>
            <Logo
              src={'./images/GnosisVPN_logo.svg'}
            />

            <NavLinks>
              <ButtonGrayCta
                label='Onboard now'
                onClick={() => setCurrentView('onboarding')}
              />
              <Button
                component="a"
                href="https://log-uploader.gnosisvpn.io/"
                target="_blank"
                rel="noreferrer noopener"
                variant="text"
                size="small"
                sx={{
                  fontSize: "0.85rem",
                  color: "#333",
                  textTransform: "none",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
                disabled
              >
                Privacy Policy
              </Button>
              <Button
                component="a"
                href="https://log-uploader.gnosisvpn.io/"
                target="_blank"
                rel="noreferrer noopener"
                variant="text"
                size="small"
                sx={{
                  fontSize: "0.85rem",
                  color: "#333",
                  textTransform: "none",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Upload Logs
              </Button>
              {
                !anonymous && <LogoutButton />
              }
            </NavLinks>
          </Nav>
        </NavContainer>

        {/* Hero Section */}
        <HeroSection>
          <HeroImageContainer>
            <video
              src="/videos/Gnosis_VPN_Atlantis_Hero_1_1.webm"
              autoPlay
              muted
              loop
            />
            <Overlay />
            <HoprBadge
              src="./images/HOPR_Privacy_Powered_by_HOPR.svg"
            />
          </HeroImageContainer>

          <ContentBoxWrapper>
            <ContentBox>
              <h1>Atlantis</h1>
              <h2>Onboarding</h2>
              <div className='message'>
                <img src="/images/avatar-gino-lp.png" alt="Avatar" />
                <p>
                  Welcome {username}! I'm Gino, your guide for this quest to Atlantis, the first hidden city on the road to Gnosis VPN's launch. This guide will walk you step by step through everything you need to get up and running.
                </p>
              </div>
              <ButtonGrayCta
                label='Onboard now'
                onClick={() => setCurrentView('onboarding')}
              />
              <div className='stair1' />
              <div className='stair2' />
            </ContentBox>
          </ContentBoxWrapper>
        </HeroSection>

        {/* Features / Onboarding Steps */}
        <Container>
          <FeaturesGrid>
            {/* Left Column */}
            <div>
              <SectionTitle>How onboarding works</SectionTitle>

              <IntroBlock>
                {/* <img
                  src="/images/avatar.png"
                  alt="Avatar"
                  style={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                  }}
                /> */}
                <p>
                  As one of our first users, you'll be shaping how Gnosis VPN looks and feels for all future explorers. To do this, this tool will both onboard you and assess how intuitive our VPN is. We'll also be on the hunt for bugs!
                </p>
              </IntroBlock>

              <StepList>
                {/* Step 1 */}
                <StepItem>
                  <StepIconBox
                    src={'./images/getting-help-icon.svg'}
                  />
                  <StepContent>
                    <h4>Follow the instructions</h4>
                    <p>
                      We’ll give you simple tasks to complete inside the app. We’re testing whether the interface is clear without extra explanation. If you need help, click “Show me…” for visual guidance.
                    </p>
                  </StepContent>
                </StepItem>

                {/* Step 2 */}
                <StepItem>
                  <StepIconBox
                    src={'./images/switching-devices-icon.svg'}
                  />
                  {
                    anonymous ? 
                    <StepContent>
                      <h4>Your actions are recorded locally only</h4>
                      <p>
                        Your actions are saved in your browser session only. If you refresh the page or close the browser, your progress will disappear and you’ll need to start over.
                      </p>
                    </StepContent>
                    :
                    <StepContent>
                      <h4>Your feedback matters</h4>
                      <p>
                        Your actions are recorded to help us understand what works and what doesn’t. If something is unclear or broken, please tell us. Briefly describe the issue and we’ll respond as quickly as possible.
                      </p>
                    </StepContent>
                  }

                </StepItem>

                {/* Step 3 */}
                <StepItem>
                  <StepIconBox
                    src={'./images/session-summary-icon.svg'}
                  />
                  <StepContent>
                    <h4>We’re here to help</h4>
                    <p>
                      If you get stuck, you can contact our support via message and we’ll help you out. And if we still can’t solve it, we’ll jump on a quick 1-on-1 call together.
                    </p>
                  </StepContent>
                </StepItem>
              </StepList>
            </div>

            {/* Right Column (Mobile Mockup) */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <img
                src="./images/Gnosis_VPN_MVP-1771410097223.svg"
                alt="Gnosis VPN MVP"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </FeaturesGrid>
        </Container>

        {/* Footer CTA */}
        <CtaBar>
          <button onClick={() => setCurrentView('onboarding')}>
            <ArrowRight size={28} /> Onboard now
          </button>
        </CtaBar>

        {/* Main Footer */}
        <Footer>
          <FooterContent>
            <FooterLogo>
              <img src="./images/dark.png" alt="Gnosis" />
            </FooterLogo>

            <FooterLinks>
              <div className="socials">
                <X size={14} />
                <Github size={14} />
                <MessageSquare size={14} />
              </div>
              <div className="links">
                <a href="#">Contact</a>
                <a href="#">About us</a>
                <a href="#">Privacy</a>
              </div>
            </FooterLinks>
          </FooterContent>
        </Footer>

      </div>
    </>
  );
};

export default GnosisLanding;