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

export default function HeaderComponent() {
    //contexts, refs
    const languageContext = useContext(LanguageContext);

    //states
    const [showingCart, setShowingCart] = useState(false);
    const [inCartProducts, setInCartProducts] = useState<any[]>([1, 2, 3]);

    //handlers
    const handleSetLanguage = useCallback((language: typeof vn) => {
        languageContext.changeLanguage(language);
    }, []);

    console.log(window.innerWidth);

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
                            Offcanvas
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
                            {window.innerWidth < 1080 && (
                                <Col className={"text-white"}>
                                    <BiSearch size={30} className={"mt-1 me-3"}/>

                                    <BiShoppingBag size={30} onClick={() => setShowingCart(true)}/>
                                    {inCartProducts.length > 0 && <Badge onClick={() => setShowingCart(true)}
                                                                         className={"cart-badge"} pill
                                                                         bg={"danger"}
                                    >{inCartProducts.length}</Badge>}

                                    <Globe2 size={25} className={"mt-1"}/>
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
                                            <BiShoppingBag onClick={() => setShowingCart(true)} size={30}
                                                           color={"white"}/>
                                            {inCartProducts.length > 0 && <Badge onClick={() => setShowingCart(true)}
                                                                                 className={"cart-badge"} pill
                                                                                 bg={"danger"}
                                            >{inCartProducts.length}</Badge>}
                                        </Col>

                                        <Col xs={"auto"}>
                                            <DropdownButton
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

                {/*cart*/}
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
        </Navbar>
    );
}
