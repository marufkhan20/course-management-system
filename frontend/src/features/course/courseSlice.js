import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  title: "",
  category: "",
  level: "",
  description: "",
  coverImage: "",
  video: "",
  requirements: [],
  price: 0,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourseInfo: (state, action) => {
      const { title, category, level, description } = action.payload;
      state.title = title;
      state.category = category;
      state.level = level;
      state.description = description;
    },
    addMedia: (state, action) => {
      const { coverImage, video } = action.payload;
      state.coverImage = coverImage;
      state.video = video;
    },
    addSettings: (state, action) => {
      const { requirements, price } = action.payload;
      state.requirements = requirements;
      state.price = price;
    },
  },
});

export default courseSlice.reducer;
export const { addCourseInfo, addMedia, addSettings } = courseSlice.actions;
