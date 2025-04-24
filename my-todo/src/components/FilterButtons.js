import React from "react";

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={filter === "الكل" ? "active" : ""}
        onClick={() => setFilter("الكل")}
      >
        الكل
      </button>
      <button
        className={filter === "منجز" ? "active" : ""}
        onClick={() => setFilter("منجز")}
      >
        منجز
      </button>
      <button
        className={filter === "غير منجز" ? "active" : ""}
        onClick={() => setFilter("غير منجز")}
      >
        غير منجز
      </button>
    </div>
  );
}

export default FilterButtons;
