import * as React from "react"
import { useContext } from 'react'
import { graphql, useStaticQuery } from "gatsby"
import { navigate } from "@reach/router"
import { Menu, X } from "react-feather"
import styled from "styled-components"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  InteractiveIcon,
  Nudge,
  VisuallyHidden,
  Logo
} from "./ui"
import {
  mobileNavOverlay,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
} from "./header.css"
import NavItemGroup from "./nav-item-group"
import BrandLogo from "./brand-logo"
import { FirebaseContext, useAuth} from "./Firebase"

const UserInfo = styled.div`
  text-align: right;
  color: white;
`

const LoginLink = styled.div`
  margin: auto 0;
  a {
    color: white;
  }
`

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;
`

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      layout {
        header {
          id
          navItems {
            id
            navItemType
            ... on NavItem {
              href
              text
            }
            ... on NavItemGroup {
              name
              navItems {
                id
                href
                text
                description
                icon {
                  alt
                  gatsbyImageData
                }
              }
            }
          }
          cta {
            id
            href
            text
          }
        }
        profileMenu {
          ... on DatoCmsLayoutheader {
            navItems {
            ... on DatoCmsNavItemGroup {
              navItems {
                href
                text
              }
              navItemType
              }
            }
          }
        }
        adminMenu {
          ... on DatoCmsLayoutheader {
            navItems {
            ... on DatoCmsNavItemGroup {
              navItems {
                href
                text
              }
              navItemType
              }
            }
          }
        }
      }
      datoCmsHomepageLogoList {
        id
        logos {
          id
          gatsbyImageData
        }
      }
    }
  `)

  const { navItems, cta } = data.layout.header
  const [isOpen, setOpen] = React.useState(false)
  const [profile, setProfile] = React.useState(null)
  //const { firebase } = useContext(FirebaseContext)
  const { firebase } = useAuth()
  let user = null;

  if (typeof window !== "undefined") {
    user = JSON.parse(window.sessionStorage.getItem('user'))
  }
  let roleMenu = null;

  if (user) {
    if (profile == null) {
      try {
          firebase.getUserProfile({userId: user.uid})
          .then((profile) => {
            setProfile(profile)
          })
        }
        catch(err) {
          console.log(err)
        }
    }
  }


  if (profile) {
    if (profile.role == "Lessee") {
      roleMenu = data.layout.profileMenu
    }
    else if (profile.role == "IT Admin") {
      roleMenu = data.layout.adminMenu
    }
  }

  function handleLogoutClick() {
    firebase.logout().then(() => {
      navigate("/login")
    })
  }

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.style.overflowY = "hidden"
      } else {
        document.body.style.overflowY = "visible"
      }
    }

  }, [isOpen])

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <Logo alt="Ingonyama Trust" image={data.datoCmsHomepageLogoList.logos[0].gatsbyImageData} size="medium" />
          </NavLink>
          <nav>
            <FlexList gap={4}>
              {navItems &&
                navItems.map((navItem) => (
                  <li key={navItem.id}>
                    {navItem.navItemType === "Group" ? (
                      <NavItemGroup
                        name={navItem.name}
                        navItems={navItem.navItems}
                      />
                    ) : (
                      <NavLink to={navItem.href}>{navItem.text}</NavLink>
                    )}
                  </li>
                ))}
            </FlexList>
          </nav>
          <div>{/**cta && <Button to={cta.href}>{cta.text}</Button>*/}
          {!!user && !!user.email && (
            <LoginLink style={{display: "flex", alignItems: "center"}}>
              <FlexList gap={4}>
                {roleMenu &&
                  roleMenu.navItems.map((navItem) => (
                    <li key={navItem.id}>
                      {navItem.navItemType === "Group" ? (
                        <NavItemGroup
                          name={navItem.name}
                          navItems={navItem.navItems}
                        />
                      ) : (
                        <NavLink to={navItem.href}>{navItem.text}</NavLink>
                      )}
                    </li>
                  ))}
              </FlexList>
              <Divider />
              <div>
                <Button onClick={handleLogoutClick}>Logout</Button>
              </div>
            </LoginLink>
          )}
          {(!user || !user.email) && (
            <LoginLink>
              <Button to="/login/">Login</Button>
              <Divider />
              <Button to="/register/">Register</Button>
            </LoginLink>
          )}
          </div>
        </Flex>
      </Container>
      <Container className={mobileHeaderNavWrapper[isOpen ? "open" : "closed"]}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <span
            className={
              mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
            }
          >
            <NavLink to="/">
              <VisuallyHidden>Home</VisuallyHidden>
              <BrandLogo />
            </NavLink>
          </span>
          <Flex>
            <Space />
            <div>
              {cta && (
                <Button to={cta.href} variant={isOpen ? "reversed" : "primary"}>
                  {cta.text}
                </Button>
              )}
            </div>
            <Nudge right={3}>
              <InteractiveIcon
                title="Toggle menu"
                onClick={() => setOpen(!isOpen)}
                className={
                  mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
                }
              >
                {isOpen ? <X /> : <Menu />}
              </InteractiveIcon>
            </Nudge>
          </Flex>
        </Flex>
      </Container>
      {isOpen && (
        <div className={mobileNavOverlay}>
          <nav>
            <FlexList responsive variant="stretch">
              {navItems?.map((navItem) => (
                <li key={navItem.id}>
                  {navItem.navItemType === "Group" ? (
                    <NavItemGroup
                      name={navItem.name}
                      navItems={navItem.navItems}
                    />
                  ) : (
                    <NavLink to={navItem.href} className={mobileNavLink}>
                      {navItem.text}
                    </NavLink>
                  )}
                </li>
              ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  )
}
