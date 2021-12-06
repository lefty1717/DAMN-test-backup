import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { IconButton } from "@material-ui/core";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { actionTypes } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// mock data
const ingredientsData = [
  { id: 1, name: "牛肉" },
  { id: 2, name: "青菜" },
  { id: 3, name: "漢堡包" },
];
// monk unit data
const unitData = [
  { id: 1, name: "公克" },
  { id: 2, name: "斤" },
  { id: 3, name: "半匙" },
];
const RecipeIngredients = () => {
  const [servingCount, setServingCount] = useState(1);
  const [selectedIngredientTags, setSelectedIngredientTags] = useState([]);
  const [selectedIngredientsInfo, setSelectedIngredientsInfo] = useState([]);
  const [{ newRecipeData }, dispatch] = useStateValue();
  console.log("selectedIngredientTags: ", selectedIngredientTags);

  // 修改份數 serving
  const handleServingCount = (e) => {
    setServingCount(e.target.value);
    dispatch({
      type: actionTypes.SET_NEWRECIPEDATA,
      newRecipeData: { ...newRecipeData, serving: parseInt(e.target.value) },
    });
  };
  // 食材標籤
  const handleIngredientTags = (value) => {
    setSelectedIngredientTags(value);
    dispatch({
      type: actionTypes.SET_NEWRECIPEDATA,
      newRecipeData: {
        ...newRecipeData,
        ingredientTags: value,
      },
    });
  };

  // 選中食材的量
  const handleIngredientCount = (e, id, name) => {
    const info = [...selectedIngredientsInfo];
    info[id] = {
      ...info[id],
      name: name,
      count: e.target.value,
    };

    setSelectedIngredientsInfo(info);
    dispatch({
      type: actionTypes.SET_NEWRECIPEDATA,
      newRecipeData: { ...newRecipeData, ingredientsInfo: info },
    });
  };
  // console.log(selectedIngredientsInfo);
  // 選中食材單位
  const handleIngredientUnit = (id, value) => {
    // console.log(`selected: ${id} unit: ${unit}`);
    const info = [...selectedIngredientsInfo];
    info[id] = {
      ...info[id],
      unit: value,
    };
    setSelectedIngredientsInfo(info);
    dispatch({
      type: actionTypes.SET_NEWRECIPEDATA,
      newRecipeData: { ...newRecipeData, ingredientsInfo: info },
    });
  };

  useEffect(() => {
    // if (newRecipeData.serving) {
    //   setServingCount(newRecipeData.serving);
    // }
    if (newRecipeData.ingredientsInfo.length !== 0) {
      setSelectedIngredientsInfo(newRecipeData?.ingredientsInfo);
    }
    console.log(newRecipeData.ingredientTags.length);
    if (newRecipeData.ingredientTags.length !== 0) {
      console.log("hello");
      setSelectedIngredientTags(newRecipeData?.ingredientTags);
    }
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {/*  適合人份  */}
      <Typography variant="h6" gutterBottom component="div">
        適合人份
      </Typography>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">人數</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={servingCount}
          onChange={handleServingCount}
          endAdornment={<InputAdornment position="start">人份</InputAdornment>}
          label="Serving"
        />
      </FormControl>
      {/* 搜尋食材 search bar */}
      <Typography variant="h6" gutterBottom component="div">
        所需食材
      </Typography>
      <Autocomplete
        multiple
        id="selectedIngredientTags"
        freeSolo
        filterSelectedOptions
        options={ingredientsData}
        noOptionsText="查無，試試其他關鍵字！"
        loadingText="載入中"
        onChange={(_, value) => handleIngredientTags(value)}
        onInputChange={(e) => console.log("fetch data from fireStore")}
        popupIcon={<SearchIcon />}
        disableCloseOnSelect
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name + "1"}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="搜尋食材" placeholder="食材" />
        )}
      />
      {/* 列出所選食材所需單位 text field */}
      {selectedIngredientTags.map((selectedIngredient, index) => (
        <Box
          key={selectedIngredient?.id}
          sx={{ display: "flex", alignItems: "center", my: 2 }}
        >
          <TextField
            label={`食材`}
            id="standard-start-adornment"
            sx={{ my: 2, flex: 1 }}
            defaultValue={selectedIngredientsInfo[index]?.count}
            onChange={(e) =>
              handleIngredientCount(e, index, selectedIngredient?.name)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {selectedIngredient.name} :
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={unitData}
            getOptionLabel={(option) => option.name}
            // defaultValue={selectedIngredient?.unit.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, value) => handleIngredientUnit(index, value)}
            sx={[
              { width: "100px" },
              {
                "&  .css-4n7jhh-MuiInputBase-root-MuiInput-root": {
                  mt: "16px",
                },
              },
              {
                "& .css-1q60rmi-MuiAutocomplete-endAdornment": {
                  top: 0,
                },
              },
            ]}
            renderInput={(params) => (
              <TextField
                variant="standard"
                {...params}
                onChange={(e) => console.log(e.target.value)}
                label="單位"
              />
            )}
          />
        </Box>
      ))}
    </Box>
  );
};

export default RecipeIngredients;
