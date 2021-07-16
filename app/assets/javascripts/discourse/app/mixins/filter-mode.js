import Category from "discourse/models/category";
import Mixin from "@ember/object/mixin";
import { computed } from "@ember/object";

export default Mixin.create({
  filterModeInternal: computed(
    "rawFilterMode",
    "filterType",
    "category",
    "noSubcategories",
    function () {
      const rawFilterMode = this.rawFilterMode;
      if (rawFilterMode) {
        return rawFilterMode;
      } else {
        const category = this.category;
        const filterType = this.filterType;

        if (category) {
          const noSubcategories = this.noSubcategories;

          return `c/${Category.slugFor(category)}${
            noSubcategories ? "/none" : ""
          }/l/${filterType}`;
        } else {
          return filterType;
        }
      }
    }
  ),

  filterMode: computed("filterModeInternal", {
    get() {
      return this.filterModeInternal;
    },

    set(key, value) {
      this.set("rawFilterMode", value);
      this.set("filterType", value.split("/").pop());

      return value;
    },
  }),
});
