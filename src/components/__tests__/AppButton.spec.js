import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AppButton from "@/components/ui/AppButton.vue";

describe("AppButton", () => {
  it("exists", () => {
    expect(AppButton).toBeTruthy();
  });

  it("renders basic button properly", () => {
    const wrapper = mount(AppButton, { props: { label: "Sample Button" } });
    expect(wrapper.text()).toContain("Sample Button");
  });

  it("renders pill button properly", () => {
    const wrapper = mount(AppButton, {
      props: { label: "Sample Button", pill: true },
    });
    expect(wrapper.text()).toContain("Sample Button");
    expect(wrapper.classes()).toContain("--pill");
  });

  it("renders active button properly", () => {
    const wrapper = mount(AppButton, {
      props: { label: "Sample Button", active: true },
    });
    expect(wrapper.text()).toContain("Sample Button");
    expect(wrapper.classes()).toContain("--active");
  });
});
