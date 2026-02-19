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
import { useAppStore } from '../store/appStore';
// --- Global Styles ---
const GlobalStyle = createGlobalStyle`

`;

// --- Styled Components ---

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
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
  height: 500px;
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
  z-index: 10;
  width: 100px;
`;

const ContentBoxWrapper = styled.div`
  position: relative;
  z-index: 20;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  pointer-events: none;
`;

const ContentBox = styled.div`
  background-color: white;
  width: 100%;
  max-width: 580px;
  padding: 40px;
  margin-top: -100px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  pointer-events: auto;

  h1 {
    font-size: 36px;
    font-weight: 300;
    margin: 0 0 8px 0;
  }

  h2 {
    font-size: 36px;
    font-weight: 500;
    color: #d1d5db;
    margin: 0 0 24px 0;
  }

  p {
    font-size: 14px;
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 24px;
  }
`;

// Features Section
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding: 80px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 0 0 32px 0;
`;

const IntroBlock = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 48px;

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
`;

const StepItem = styled.div`
  display: flex;
  gap: 16px;
`;

const StepIconBox = styled.div`
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
  padding: 32px 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
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
  background-color: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 16px;
    height: 8px;
    background-color: white;
    border-radius: 2px;
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

  return (
    <>
      <GlobalStyle />
      <div className={`GnosisLanding${className ? ` ${className}` : ""}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Navigation */}
        <Container>
          <Nav>
            <Logo
              src={'./images/GnosisVPN_logo.svg'}
            />

            <NavLinks>
              <ButtonGrayCta
                label='Onboard now'
                onClick={() => setCurrentView('onboarding')}
              />
              <a href="#">Privacy Policy</a>
              <LogoutButton />
            </NavLinks>
          </Nav>
        </Container>

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
              <h1>Gnosis VPN MVP</h1>
              <h2>Onboarding</h2>
              <p>
                Welcome <span style={{ fontStyle: 'italic' }}>(username)</span>! I'm Gino, your guide for this quest to Atlantis, the first hidden city on the road to Gnosis VPN's launch. This guide will show you step by step what you need to get up and running it a breeze using it.
              </p>
              <ButtonGrayCta
                label='Onboard now'
                onClick={() => setCurrentView('onboarding')}
              />
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
                <img
                  src="/images/avatar.png"
                  alt="Avatar"
                  style={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                  }}
                />
                <p>
                  As one of our first users, you'll be shaping how Gnosis VPN looks and feels for all future explorers. To do this, this tool will both onboard you and assess how intuitive our VPN is. We'll also be on the hunt for bugs!
                </p>
              </IntroBlock>

              <StepList>
                {/* Step 1 */}
                <StepItem>
                  <StepIconBox>1</StepIconBox>
                  <StepContent>
                    <h4>Determine if the page is good</h4>
                    <p>
                      I'll be giving you instructions to get onboarded. We're assessing our UI's clarity and feedback. If you need more, click the "Show me..." to get visual info on what to do.
                    </p>
                  </StepContent>
                </StepItem>

                {/* Step 2 */}
                <StepItem>
                  <StepIconBox>2</StepIconBox>
                  <StepContent>
                    <h4>Your requests are being recorded</h4>
                    <p>
                      If this still isn't enough info, or something is broken, you can write to us in there. Please briefly describe the issue and we'll reply ASAP to get back on track.
                    </p>
                  </StepContent>
                </StepItem>

                {/* Step 3 */}
                <StepItem>
                  <StepIconBox>3</StepIconBox>
                  <StepContent>
                    <h4>We help you</h4>
                    <p>
                      If we still can't figure things out, you can schedule a call with us for a 1-on-1 debugging session.
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
              <div />
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