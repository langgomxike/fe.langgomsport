import { Card, Col, Container, Image, Row } from "react-bootstrap";
import RootLayout from "../../layouts/RootLayout";
import { useCallback, useEffect, useState } from "react";
import "./productDetail.css";
import "react-loading-skeleton/dist/skeleton.css";
import AProduct from "../../../apis/AProduct";
import ProductItem from "../../components/productItem/ProductItem";
import SkeletonProductItem from "../../components/productItem/SkeletonProductItem";
import CategoryFilter from "../../components/Category/CategoryFIlter";
import GoHeaderButton from "../../components/GoHeadButton/goHeaderButton";
import CategoryItem from "../../components/Category/CategoryItem";
import BrandFilter from "../../components/Brand/BrandFilter";

const MAX_AMOUNT_PRODUCTS_PER_PAGE = 20;
const PRODUCTS_PER_ROW_IN_WEB = 4;
const PRODUCTS_PER_ROW_IN_TABLET = 3;
const PRODUCTS_PER_ROW_IN_MOBILE = 2;

export const DEFAULT_PRODUCT_ITEM_HEIGHT = 350;

export default function ProductListScreen() {
  //ui
  return (
    <RootLayout>
      <div className="content">
        <div className="row">
          <div className="col-6 row">
            <div className="col-3 component">
              <div className="small_imgs">
                <img
                  className="img-fluid small_img"
                  src="https://i.vietgiaitri.com/2022/10/23/mono-he-lo-tao-hinh-cho-mv-waiting-for-you-toc-dai-lang-tu-tua-tai-tu-hong-kong-7a6-6709523.jpg"
                  alt=""
                />
              </div>
              <div className="small_img">
                <img
                  className="img-fluid small_img"
                  src="https://i.vietgiaitri.com/2022/10/23/mono-he-lo-tao-hinh-cho-mv-waiting-for-you-toc-dai-lang-tu-tua-tai-tu-hong-kong-7a6-6709523.jpg"
                  alt=""
                />
              </div>
              <div className="small_img">
                <img
                  className="img-fluid small_img"
                  src="https://i.vietgiaitri.com/2022/10/23/mono-he-lo-tao-hinh-cho-mv-waiting-for-you-toc-dai-lang-tu-tua-tai-tu-hong-kong-7a6-6709523.jpg"
                  alt=""
                />
              </div>
              <div className="small_img">
                <img
                  className="img-fluid small_img"
                  src="https://i.vietgiaitri.com/2022/10/23/mono-he-lo-tao-hinh-cho-mv-waiting-for-you-toc-dai-lang-tu-tua-tai-tu-hong-kong-7a6-6709523.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="col-9 component">
              <div className="big_img">
                <img
                  className="img-fluid"
                  src="https://i.vietgiaitri.com/2022/10/23/mono-he-lo-tao-hinh-cho-mv-waiting-for-you-toc-dai-lang-tu-tua-tai-tu-hong-kong-7a6-6709523.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-6 component">
            <div className="producName">A nhan nhan nhan</div>
            <div className="row productInfors ">
              <div className="col-6 ">
                <div className="detailInfor status">
                  <b>Tình trạng:</b> còn hàng
                </div>
                <div className="detailInfor brand">
                  <b>Tình trạng:</b> còn hàng
                </div>
              </div>
              <div className="col-6">
                <div className="detailInfor productId">
                  <b>Tình trạng:</b> còn hàng
                </div>
                <div className="detailInfor productType">
                  <b>Tình trạng:</b> còn hàng
                </div>
              </div>
            </div>
            <hr />
            <div className="price">20000</div>
            <hr />
            <div className="smalltitle">Màu sắc</div>
            <div className="color">
            <img
                  className="img-fluid imgColor"
                  src="https://i.vietgiaitri.com/2022/10/23/mono-he-lo-tao-hinh-cho-mv-waiting-for-you-toc-dai-lang-tu-tua-tai-tu-hong-kong-7a6-6709523.jpg"
                  alt=""
                />
            </div>
            <div className="smalltitle">Chất liệu</div>
            <div className="chatLieu">a nhanw nhanw nhanw</div>
            <div className="chonSize">
              <div className="row">
                <div className="col-6">
                  <div className="smalltitle">Kích thước</div>
                </div>
                <div className="col-6">
                  <div className="smalltitle">Hướng dẫn chọn size</div>
                </div>
              </div>
              <div className="sizes">
                <div className="size ">31</div>
                <div className="size ">32</div>
                <div className="size ">33</div>
                <div className="size ">34</div>
              </div>
            </div>
            <div className="nutChucNang">
              <div className="row">
                <div className="col-3 row btn_totals">
                  <div className="col-2 btn_total">+</div>
                  <div className="col-8 btn_total"></div>
                  <div className="col-2 btn_total">-</div>
                </div>
                <div className="col-9">
                  <div className="btnAddTocart"> Theem vao gio hang</div>
                </div>
              </div>
              <div className="btnBuyNow"> Buy Now</div>
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="titleDescription">Mô tả sản phẩm</div>
        <div className="line"></div>
        <div className="contentOfDescription">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos,
        veritatis facere non voluptate ab, qui iure eos ullam repellat
        perspiciatis ipsum laudantium harum quo veniam, beatae provident quidem
        consequuntur doloribus? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quam totam maxime labore. Accusantium sequi ducimus,
        sapiente provident dolor maiores libero aliquid fugiat nobis facilis
        eligendi maxime qui cupiditate at magni?
        </div>
      </div>
    </RootLayout>
  );
}
