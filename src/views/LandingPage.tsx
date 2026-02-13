import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  ArrowRight,
  Smile,
  MessageSquare,
  HelpCircle,
  Settings,
  List,
  Terminal,
  Check,
  ChevronDown,
  X,
  Github,
} from 'lucide-react';
import Button from '../components/Button';import { useAppStore } from '../store/appStore';
// --- Global Styles ---
const GlobalStyle = createGlobalStyle`

`;

// --- Styled Components ---

const Container = styled.div`
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

const ButtonBeige = styled.button`
  background-color: #EDECE6;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #e0ded5;
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

  img {
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

const HoprBadge = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 10;

  div {
    background-color: #1e40af;
    color: white;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    border: 2px solid white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  span {
    font-weight: bold;
    text-transform: lowercase;
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: #facc15;
    border-radius: 50%;
    margin-bottom: 4px;
    border: none;
  }
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
  margin: 0 0 8px 0;
`;

const SubTitle = styled.h3`
  font-size: 28px;
  font-weight: 400;
  color: #ef4444;
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

const AvatarCircle = styled.div`
  width: 48px;
  height: 48px;
  background-color: #1e293b;
  border-radius: 50%;
  border: 2px solid white;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
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

// Mobile Mockup CSS
const MockupContainer = styled.div`
  width: 300px;
  height: 550px;
  background-color: #f9fafb;
  border-radius: 30px;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
`;

const MockupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;

  .dot {
    width: 8px;
    height: 8px;
    background-color: #22c55e;
    border-radius: 50%;
  }
`;

const MockupIcons = styled.div`
  display: flex;
  gap: 8px;

  div {
    background-color: black;
    color: white;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
`;

const MockupBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: #e5e7eb;
    width: 96px;
    height: 96px;
  }
`;

const MockupFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NodeSelector = styled.div`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .label {
    font-size: 10px;
    color: #9ca3af;
    margin-bottom: 2px;
  }
  .value {
    font-size: 14px;
    font-weight: 700;
  }
`;

const GreenIndicator = styled.div`
  display: flex;
  justify-content: center;

  div {
    height: 64px;
    width: 24px;
    background-color: #166534;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
  }
`;

const StopButton = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  padding: 12px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  border: none;
  cursor: pointer;
`;

// Footer CTA
const CtaBar = styled.div`
  background-color: #EDECE6;
  padding: 48px 0;
  text-align: center;
  margin-top: auto;

  a {
    font-size: 30px;
    font-weight: 400;
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      text-decoration: underline;
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
                src={'src\\assets\\GnosisVPN_logo.svg'}
            />

            <NavLinks>
              <Button
                label='Onboard now'
                onClick={() => setCurrentView('onboarding')}
              />
              <a href="#">Privacy Policy</a>
              <a href="#" style={{color: '#999'}}>(→ Logout</a>
            </NavLinks>
          </Nav>
        </Container>

        {/* Hero Section */}
        <HeroSection>
          <HeroImageContainer>
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2568&auto=format&fit=crop"
              alt="Sci-fi ancient city"
            />
            <Overlay />
            <HoprBadge>
              <div>
                <div className="dot" />
                <span>hopr</span>
              </div>
            </HoprBadge>
          </HeroImageContainer>

          <ContentBoxWrapper>
            <ContentBox>
              <h1>Gnosis VPN MVP</h1>
              <h2>Onboarding</h2>
              <p>
                Blindtext in appropriate look. Welcome to the Gnosis VPN self-onboarding.
                This guide will walk you step by step through setting up and using Gnosis VPN.
                It is a privacy-respecting web app and does not track you by default.
              </p>
              <ButtonBeige>
                Onboard now
              </ButtonBeige>
            </ContentBox>
          </ContentBoxWrapper>
        </HeroSection>

{/* Features / Onboarding Steps */}
        <Container>
          <FeaturesGrid>
            {/* Left Column */}
            <div>
              <SectionTitle>How onboarding works</SectionTitle>
              <SubTitle>Blindtext / maybe cut</SubTitle>

              <IntroBlock>
                <AvatarCircle>
                  <img src="https://via.placeholder.com/50" alt="User Avatar" />
                </AvatarCircle>
                <p>
                  As one of our earliest users, you will be shaping how Gnosis VPN looks and feels for all future explorers. To do this, this page is designed to assess how intuitive Gnosis VPN is.
                </p>
              </IntroBlock>

              <StepList>
                {/* Step 1 */}
                <StepItem>
                  <StepIconBox>
                    <Smile size={14} />
                  </StepIconBox>
                  <StepContent>
                    <h4>Determine if the page is good</h4>
                    <p>
                      At each step, you'll get an instruction which we'll ask you to follow on your own. If you can't work out how, click the "Show me how" button to receive a screenshot or video.
                    </p>
                  </StepContent>
                </StepItem>

                {/* Step 2 */}
                <StepItem>
                  <StepIconBox>
                    <MessageSquare size={14} />
                  </StepIconBox>
                  <StepContent>
                    <h4>Your requests are being recorded</h4>
                    <p>
                      If you still can't figure out what to do, or something is broken, please briefly describe the issue and we'll respond as soon as possible to get you back on track.
                    </p>
                  </StepContent>
                </StepItem>

                {/* Step 3 */}
                <StepItem>
                  <StepIconBox>
                    <HelpCircle size={14} />
                  </StepIconBox>
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
              <MockupContainer>
                <MockupHeader>
                  <ConnectionStatus>
                    <div className="dot" />
                    <span>Connected</span>
                  </ConnectionStatus>
                  <MockupIcons>
                    <div><Settings size={12} /></div>
                    <div><List size={12} /></div>
                    <div><Terminal size={12} /></div>
                  </MockupIcons>
                </MockupHeader>

                <MockupBody>
                  <Check strokeWidth={3} />
                </MockupBody>

                <MockupFooter>
                  <NodeSelector>
                    <div>
                      <div className="label">Exit Node</div>
                      <div className="value">Default</div>
                    </div>
                    <ChevronDown size={16} />
                  </NodeSelector>

                  <GreenIndicator>
                    <div>^</div>
                  </GreenIndicator>

                  <StopButton>Stop</StopButton>
                </MockupFooter>
              </MockupContainer>
            </div>
          </FeaturesGrid>
        </Container>

        {/* Footer CTA */}
        <CtaBar>
          <button onClick={() => setCurrentView('onboarding')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '30px', fontWeight: '400', color: 'black', padding: 0 }}>
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