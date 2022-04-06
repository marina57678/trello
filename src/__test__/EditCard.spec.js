import React from "react";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

import EditCard from "../components/EditCard";

describe("<EditCard />", () => {
   const setIsEditing = jest.fn();
   const isTaskChanged = jest.fn();
   const setSubmit = jest.fn();
   const task = {
      id: 1,
      title: "task1",
      description: "description1",
   };

   const handleClick = jest.spyOn(React, "useState");
   handleClick.mockImplementation((submit) => [submit, setSubmit]);

   let wrapper;
   beforeEach(() => {
      jest.clearAllMocks();
      wrapper = mount(
         <EditCard
            isEditing={setIsEditing}
            isTaskChanged={isTaskChanged}
            {...task}
         />
      );
   });
   it("renders", () => {
      expect(wrapper).not.toBeNull();
      expect(wrapper.props().isEditing).toEqual(setIsEditing);
      expect(wrapper.props().isTaskChanged).toEqual(isTaskChanged);
   });

   it("renders form(EditCard)", () => {
      expect(wrapper.find(EditCard)).toHaveLength(1);
      expect(wrapper.find("form")).toHaveLength(1);
   });
   describe("EditCard(form) nodes", () => {
      it("has input and input has className 'card__title input title__input'", () => {
         expect(
            wrapper.find("input").hasClass("card__title input title__input")
         ).toBe(true);
      });

      it("has textarea and textarea has className 'card__text input text__input'", () => {
         expect(
            wrapper.find("textarea").hasClass("card__text input text__input")
         ).toBe(true);
      });

      it("has buttons container", () => {
         expect(wrapper.find(".card__buttons")).toHaveLength(1);
      });

      describe("buttons container nodes", () => {
         it("has cancel btn", () => {
            expect(wrapper.find(".card__button-cancel")).toHaveLength(1);
         });

         it("has cancel btn with text 'cancel' ", () => {
            expect(
               wrapper.find(".card__button-cancel").text().includes("cancel")
            ).toBe(true);
         });

         it("has cancel btn with classList", () => {
            expect(
               wrapper
                  .find(".card__button-cancel")
                  .hasClass("card__button button card__button-cancel")
            ).toBe(true);
         });

         it("has edit btn", () => {
            expect(wrapper.find(".card__button-edit")).toHaveLength(1);
         });

         it("has edit btn with text 'edit' ", () => {
            expect(
               wrapper.find(".card__button-edit").text().includes("edit")
            ).toBe(true);
         });

         it("has edit btn with classList", () => {
            expect(
               wrapper
                  .find(".card__button-edit")
                  .hasClass("card__button button card__button-edit")
            ).toBe(true);
         });

         it("handle click cancel btn", () => {
            wrapper.find(".card__button-cancel").props().onClick();
            expect(setIsEditing).toHaveBeenCalledTimes(1);
            // console.log(wrapper.submit);
            // expect(wrapper.dive().state("submit")).toBe(true);
            // wrapper.setState({ submit: false });
         });
         it("handle click edit btn", () => {
            const submitBtn = wrapper.find(".card__button-edit");

            console.log(submitBtn.prop("disabled"));
            expect(submitBtn.prop("disabled")).toBeFalsy();
            submitBtn.simulate("click");
            console.log(submitBtn.props());
            // submitBtn.props().onClick
            // expect(submitBtn.props().onClick).toHaveBeenCalledTimes(1);
            // //console.lod(submitBtn.props("disabled"))
            // expect(submitBtn.prop("disabled")).toBeTruthy();
         });
      });
   });
   // it('allows us to set props', () => {
   // 	expect(wrapper.props().bar).to.equal('baz');
   // 	wrapper.setProps({ bar: 'foo' });
   // 	expect(wrapper.props().bar).to.equal('foo');
   // });
});
