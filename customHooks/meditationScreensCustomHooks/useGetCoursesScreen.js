import React, { useState } from "react";
import { useSelector } from "react-redux";

function useGetCoursesScreen() {
  const [filtersVisible, setfiltersVisible] = useState(false);
  const filteredCourses = useSelector(
    (state) => state.meditation.filteredMeditations
  );
  const fetchCoursesLoading = useSelector(
    (state) => state.meditation.fetchCoursesLoading
  );
  const fetchCoursesError = useSelector(
    (state) => state.meditation.fetchCoursesError
  );
  const isLoggedIn = useSelector((state) => state.AuthData.loggedIn);

  return {
    filtersVisible,
    setfiltersVisible,
    filteredCourses,
    fetchCoursesLoading,
    fetchCoursesError,
    isLoggedIn,
  };
}

export default useGetCoursesScreen;
