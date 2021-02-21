import React, { useState } from "react";
import { Typography, Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const {Option} = Select 

const Continetns = [
  { key: 1, value: "국음식" },
  { key: 2, value: "젓갈류" },
  { key: 3, value: "전" },
  { key: 4, value: "김치류" },
  { key: 5, value: "나물류" },
  { key: 6, value: "오늘의 메뉴" },
  { key: 7, value: "마른반찬" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (value) => {
    setContinent(value);
  };

  const updateImages = (newImages) => {
    setImages(newImages)
    }

  const submitHandler = (event) => {
    event.preventDefault();
    
    if(!Title || !Description || !Price || !Continent || !Images){
      return alert("모든 값을 넣으셔야 합니다")
    }

    const body = {
        writer: props.user.userData_id,
        title: Title,
        description : Description,
        price : Price,
        images : Images,
        continents : Continent
    }
   

    Axios.post("/api/product", body)
          .then(response => {
            if(response.data.success){
              alert("상품 업로드 성공")
              props.history.push('/')
            }else{
              alert("상품 업로드 실패")
            }
          })
        }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2> 새 반찬 메뉴 올리기 </h2>
      </div>
      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages}/>

        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title}></Input>
        <br />
        <br />
        <label>간단한 설명</label>
        <TextArea
          onChange={descriptionChangeHandler}
          value={Description}
        ></TextArea>
        <br />
        <br />
        <label>가격</label>
        <Input onChange={priceChangeHandler} value={Price}></Input>
        <br />
        <br />
        <Select
          style={{ width: 120 }}
          onChange={continentChangeHandler}
          value={Continent}
        > 
          {Continetns.map(item => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>

        <Button type="submit" onClick={submitHandler}>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
