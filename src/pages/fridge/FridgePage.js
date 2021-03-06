import React from "react";
import { Avatar, Button, Card, Grid, Typography } from "@mui/material";
//mui icon
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AddIcon from "@mui/icons-material/Add";
//image
import manage from "../../images/fridgeManage.png";
import shoppingCart from "../../images/fridgeShoppingCart.png";
import foodIcon1 from "../../images/fridgeFoodIcon1.jpeg";
import foodIcon2 from "../../images/fridgeFoodIcon2.jpeg";
import foodIcon3 from "../../images/fridgeFoodIcon3.jpeg";
import background from "../../images/fridgeIndexBar.jpg";
//component
import BottomNav from "../../components/BottomNav";

//跳轉頁面
import { useNavigate } from 'react-router-dom';

export default function FridgePage() {
  const navigate = useNavigate()
  const goToShoppingListPage = function(){
    navigate('/fridge/shoppinglist');
  }
  const goToCreatShoppingListPage = function(){
    navigate('/fridge/creatshoppinglist');
  }
  const goToFridgeManagePage = function(){
    navigate('/fridge/fridgemanage');
  }

  return (
    <div className="fridgeIndex">
      <Grid className="box">
        <div className="overview__container">
          <Card className="overview"></Card>
          <div className="font">
            <Typography>40</Typography>
            <Typography>8</Typography>
            <Typography>5</Typography>
            <Typography>總數量</Typography>
            <Typography>快到期</Typography>
            <Typography>已過期</Typography>
          </div>
        </div>

        <Card className="word">
          <Typography>功能</Typography>
        </Card>

        <Card className="function">
          <Button onClick={goToFridgeManagePage}>
            <img src={manage}></img>
            <Typography>保存管理</Typography>
          </Button>

          <Button onClick={goToShoppingListPage}>
            <img src={shoppingCart} className="shoppingListIcon"></img>
            <Typography>購物清單</Typography>
          </Button>
        </Card>
        <Card className="word">
          <Typography>新增</Typography>
        </Card>

        <Card className="addFood">
          <Button fullWidth onClick={goToCreatShoppingListPage}>
            <div className="discription">
              <RestaurantIcon className="fork" />
              <h2>新增購物清單</h2>
              <h3>輸入你冰箱中的食材吧！</h3>
            </div>

            <div className="avatar">
              <div className="foodIcon">
                <Avatar
                  src={foodIcon1}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Avatar
                  src={foodIcon2}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Avatar
                  src={foodIcon3}
                  sx={{ width: "30px", height: "30px" }}
                />
              </div>
              <AddIcon className="addIcon" />
            </div>
          </Button>
        </Card>
      </Grid>
      <BottomNav />
    </div>
  );
};
