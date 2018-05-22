/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import MainLayout from "../../../src/layouts/index";

describe("layout", () => {
  describe("pathnames to titles", () => {
    const pathNames = {
      "/": "Home",
      "/computers": "Computers",
      "/projects": "Projects",
      "/projects/Unknown Region": "Project - Unknown Region",
      "/presentations": "Presentations",
      "/presentations/vim": "Presentation - Vim",
      "/tags": "Tags",
      "/tags/docker": "Tagged in Docker",
      "/categories": "Categories",
      "/categories/docker": "Category - Docker"
    };
    Object.entries(pathNames).forEach(([url, title]) => {
      test(url, () => {
        const wrapper = shallow(
          <MainLayout location={{ pathname: url }}>{jest.fn()}</MainLayout>
        );
        expect(wrapper).toBeTruthy();
        expect(wrapper.find("Navigation").props().LocalTitle).toEqual(title);
      });
    });
  });
});
