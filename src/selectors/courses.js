//Show visible courses :
const compareBy = field => {
  function compareByDate(a, b) {
    const da = new Date(a.date + " " + a.hour);
    const db = new Date(b.date + " " + b.hour);
    return da > db ? 1 : da < db ? -1 : 0;
  }
  if (field === "date") {
    return compareByDate;
  }
  function compareByMainCourse(a, b) {
    const ca = a.course_id;
    const cb = b.course_id;
    return ca > cb ? 1 : ca < cb ? -1 : 0;
  }
  if (field === "main_course") {
    return compareByMainCourse;
  }

  if (field === "main_course_date") {
    return (a, b) =>
      compareByMainCourse(a, b) != 0
        ? compareByMainCourse(a, b)
        : compareByDate(a, b);
  }
};

export default (courses, { endDate, startDate, courseIdFilters }) => {
  let filteredLessons = [];
  courses.forEach(course => {
    const isInFilteredCourses =
      courseIdFilters.length == 0 || courseIdFilters.includes(course.id);
    filteredLessons = filteredLessons.concat(
      course.lessons.filter(lesson => {
        const laterThanStartDate =
          !startDate || new Date(lesson.date) >= startDate;
        const earlierThanEndDate = !endDate || new Date(lesson.date) <= endDate;
        console.log(
          isInFilteredCourses,
          laterThanStartDate,
          earlierThanEndDate
        );
        return isInFilteredCourses && laterThanStartDate && earlierThanEndDate;
      })
    );
  });
  return filteredLessons.sort(compareBy("date"));
};
