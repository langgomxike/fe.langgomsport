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
import {useCallback, useContext, useEffect, useState} from "react";
import LanguageContext from "../../../configs/LanguageConfig";
import vn from "../../../data/vn.json";
import en from "../../../data/en.json";
import {Globe2} from "react-bootstrap-icons";
import {useLocation, useNavigate} from "react-router-dom";
import CartContext from "../../../configs/CartConfig";
import CategoryFilter from "../Category/CategoryFIlter";

export const MOBILE_MAX_WIDTH = 960;

export default function HeaderComponent() {
  //contexts, refs
  const languageContext = useContext(LanguageContext);
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const location = useLocation();

  //states
  const [showingMenu, setShowingMenu] = useState(false);
  const [showingSearchBar, setShowingSearchBar] = useState(false);
  const [showingDropdownLanguages, setShowingDropdownLanguages] = useState(false);
  const [quantityInCart, setQuantityInCart] = useState(0);
  const [categoryId, setcCategoryId] = useState(1);

  //handlers
  const handleSetLanguage = useCallback((language: typeof vn) => {
    languageContext.changeLanguage(language);
    setShowingDropdownLanguages(false);
  }, []);

  const goToCart = useCallback(() => {
    navigate(ScreenNameConfig.CART);
  }, []);

  //effects
  useEffect(() => {
    let quantity = 0;
    cartContext.items.forEach(item => {
      quantity += item.quantity;
    });

    setQuantityInCart(quantity);
  }, [cartContext]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category_id");
    if (categoryParam) {
      let categoryId = parseInt(categoryParam || "null", 10) || null;

      if (categoryId) {
        setcCategoryId(categoryId);
      }
    }
  }, []);

  // @ts-ignore
  return (
    <Navbar bg="primary" data-bs-theme="dark" expand={"xl"}>
      <Container>
        <Navbar.Toggle onClick={() => setShowingMenu(true)} aria-controls={`offcanvasNavbar-expand-xl`}/>

        <Navbar.Brand className={"mx-auto"} href={ScreenNameConfig.HOME}>LanggomSport</Navbar.Brand>

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-xl`}
          aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
          show={showingMenu}
        >
          <Offcanvas.Header closeButton onHide={() => setShowingMenu(false)}>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <Nav.Link href={ScreenNameConfig.HOME}>{languageContext.language.HOME}</Nav.Link>
              <Nav.Link href={ScreenNameConfig.PRODUCTS}>{languageContext.language.PRODUCT}</Nav.Link>

              {window.innerWidth < MOBILE_MAX_WIDTH && (<CategoryFilter route={"products"} onAfterClick={() => setShowingMenu(false)} categoryId={categoryId}/>)}
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

                  {quantityInCart > 0 && <Badge
                    className={"cart-badge"} pill
                    bg={"danger"}
                    onClick={goToCart}
                  >{quantityInCart}</Badge>}

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
                      {quantityInCart > 0 && <Badge onClick={goToCart}
                                                    className={"cart-badge"} pill
                                                    bg={"danger"}
                      >{quantityInCart}</Badge>}
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
