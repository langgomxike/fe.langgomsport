import {
  Nav,
  Navbar,
  Container,
  Form,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  Button,
  Badge,
  Offcanvas
} from "react-bootstrap";
import ScreenNameConfig from "../../../configs/ScreenNameConfig";
import {BiSearch, BiShoppingBag} from "react-icons/bi";
import "./header.css";
import {useCallback, useContext, useState} from "react";
import LanguageContext from "../../../configs/LanguageConfig";
import vn from "../../../data/vn.json";
import en from "../../../data/en.json";
import {Globe2} from "react-bootstrap-icons";
import {useNavigate} from "react-router-dom";

const MOBILE_MAX_WIDTH = 960;

export default function HeaderComponent() {
  //contexts, refs
  const languageContext = useContext(LanguageContext);
  const navigate = useNavigate();

  //states
  const [showingCart, setShowingCart] = useState(false);
  const [inCartProducts, setInCartProducts] = useState<any[]>([1, 2, 3]);
  const [showingSearchBar, setShowingSearchBar] = useState(false);
  const [showingDropdownLanguages, setShowingDropdownLanguages] = useState(false);

  //handlers
  const handleSetLanguage = useCallback((language: typeof vn) => {
    languageContext.changeLanguage(language);
    setShowingDropdownLanguages(false);
  }, []);

  const goToCart = useCallback(() => {
    navigate(ScreenNameConfig.CART);
  }, []);

  // @ts-ignore
  return (
    <Navbar bg="primary" data-bs-theme="dark" expand={"xl"}>
      <Container>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`}/>

        <Navbar.Brand className={"mx-auto"} href={ScreenNameConfig.HOME}>LanggomSport</Navbar.Brand>

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-xl`}
          aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <Nav.Link href={ScreenNameConfig.HOME}>{languageContext.language.HOME}</Nav.Link>
              <Nav.Link href={ScreenNameConfig.PRODUCTS}>{languageContext.language.PRODUCT}</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Nav className="ms-auto">
          <Form>
            <Row>
              {window.innerWidth < MOBILE_MAX_WIDTH && (
                <Col className={"text-white ms-auto position-relative"}>
                  <BiSearch size={30} className={"mt-1 me-3"}
                            onClick={() => setShowingSearchBar(prev => !prev)}/>

                  <BiShoppingBag size={30}
                                 onClick={goToCart}
                                 color={"white"}/>

                  {inCartProducts.length > 0 && <Badge
                    className={"cart-badge"} pill
                    bg={"danger"}
                    onClick={goToCart}
                  >{inCartProducts.length}</Badge>}

                  <Globe2 size={25} className={"mt-1"} onClick={() => setShowingDropdownLanguages(prev => !prev)}/>

                  {showingDropdownLanguages && <div
                    id={"multilanguage-dropdown-desktop"}
                    className={"dropdown-menu show dropdown-menu-end"}
                  >
                    <Dropdown.Item
                      onClick={() => handleSetLanguage(en)}>{en.NAME}</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSetLanguage(vn)}>{vn.NAME}</Dropdown.Item>
                  </div>}


                </Col>
              ) || (
                <>
                  <Col xs="auto" className={"d-flex gap-2"}>
                    <Form.Control
                      type="text"
                      placeholder={languageContext.language.SEARCH_PLACEHOLDER}
                      style={{background: "transparent"}}
                    />

                    <Button className={"btn btn-outline-light"}
                            type="submit">{languageContext.language.SEARCH}</Button>

                    <Col xs={"auto"} className={"pt-1 ps-2"}>
                      <BiShoppingBag size={30}
                                     onClick={goToCart}
                                     color={"white"}/>
                      {inCartProducts.length > 0 && <Badge onClick={goToCart}
                                                           className={"cart-badge"} pill
                                                           bg={"danger"}
                      >{inCartProducts.length}</Badge>}
                    </Col>

                    <Col xs={"auto"}>
                      <DropdownButton
                        id={"multilanguage-dropdown-desktop"}
                        title={
                          <>
                            <Globe2 size={20} className={"me-2 mb-1"}/>
                            {languageContext.language.NAME}
                          </>
                        }
                        align={"end"}
                      >
                        <Dropdown.Item
                          onClick={() => handleSetLanguage(en)}>{en.NAME}</Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleSetLanguage(vn)}>{vn.NAME}</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Col>
                </>
              )}
            </Row>
          </Form>
        </Nav>

        {/*cart*/
        }
        <Offcanvas show={showingCart} onHide={() => setShowingCart(false)} placement={"end"}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>CART</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </Container>

      {showingSearchBar && <Container>
        <Nav className={"mx-auto"}>
          <Form.Control
            type="text"
            placeholder={languageContext.language.SEARCH_PLACEHOLDER}
            style={{background: "transparent"}}
            className={"header-search-bar-mobile"}/>
        </Nav>
      </Container>}
    </Navbar>
  );
}
