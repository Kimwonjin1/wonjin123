import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents } from "./Sections/Datas";
const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Limit, setLimit] = useState(8);
  const [Skip, setSkip] = useState(0);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({ continents: [] });
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      limit: Limit,
      skip: Skip,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    Axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품 가져오는데 실패하였습니다");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      limit: Limit,
      skip: skip,
      loadMore: true,
    };
    getProducts(body);

    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          key={index}
          cover={
            <a href={`/product/${product._id}`}>
              {" "}
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      limit: Limit,
      skip: 0,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filters, category) => {
    const newFilters = {
      ...Filters,
    };

    newFilters[category] = filters;

    showFilteredResults(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);

    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "75%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>점심네 반찬</h2>
      </div>
      <Row>
        <Col lg={36} xs={24}>
          {/* filter */}
          <CheckBox list={continents} handleFilters={(filters) => handleFilters(filters, "continents")} />
        </Col>
      </Row>
      {/* search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFucntion={updateSearchTerm} />
      </div>

      {/* cards */}

      <Row gutter={[16, 16]}>{renderCards}</Row>

      {PostSize >= Limit && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
