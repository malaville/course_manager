//Show visible courses :
import moment from "moment";
const compareBy = field => {
  function compareByDate(a, b) {
    const da = moment(a.date + " " + a.hour);
    const db = moment(b.date + " " + b.hour);
    return da.isAfter(db) ? 1 : da.isBefore(db) ? -1 : 0;
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

export default (
  courses,
  { endDate, startDate, courseIdFilters, sortLessonsBy }
) => {
  courseIdFilters = courseIdFilters.map(x => parseInt(x));
  let filteredLessons = [];
  courses.forEach(course => {
    const isInFilteredCourses =
      courseIdFilters.length == 0 || courseIdFilters.includes(course.id);
    filteredLessons = filteredLessons.concat(
      course.lessons
        .filter(lesson => {
          const laterThanStartDate =
            !startDate || moment(lesson.date).isSameOrAfter(startDate);
          const earlierThanEndDate =
            !endDate || moment(lesson.date).isSameOrBefore(endDate);
          return (
            isInFilteredCourses && laterThanStartDate && earlierThanEndDate
          );
        })
        .map(lesson => ({ ...lesson, course_short_name: course.short_name }))
    );
  });
  return filteredLessons.sort(compareBy(sortLessonsBy));
};
