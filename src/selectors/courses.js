//Show visible courses :
import moment from 'moment';
const compareBy = field => {
  function compareByDate(a, b) {
    const da = moment(a.date + ' ' + a.hour);
    const db = moment(b.date + ' ' + b.hour);
    return da.isAfter(db) ? 1 : da.isBefore(db) ? -1 : 0;
  }
  if (field === 'date') {
    return compareByDate;
  }
  function compareByMainCourse(a, b) {
    const ca = a.course_id;
    const cb = b.course_id;
    return ca > cb ? 1 : ca < cb ? -1 : 0;
  }
  if (field === 'main_course') {
    return compareByMainCourse;
  }

  if (field === 'main_course_date') {
    return (a, b) => (compareByMainCourse(a, b) != 0 ? compareByMainCourse(a, b) : compareByDate(a, b));
  }
};

export default (courses, { endDate, startDate, courseIdFilters, sortLessonsBy, showWithNoDate = false }) => {
  //
  courseIdFilters = courseIdFilters.map(x => parseInt(x));
  let filteredLessons = [];
  //Pour chaque cours, on ajoute à la liste déjà fabriquée, la liste des cours qui se qualifient  par le .filter()
  //S'il n'y a pas de endDate, startDate, alors les cours sont forcément bon du point de vue date.
  courses.forEach(course => {
    const isInFilteredCourses = courseIdFilters.length == 0 || courseIdFilters.includes(course.id);
    filteredLessons = filteredLessons.concat(
      course.lessons
        .filter(lesson => {
          const hasDate = !!lesson.date;
          const laterThanStartDate = hasDate && (!startDate || moment(lesson.date).isSameOrAfter(startDate));
          const earlierThanEndDate = hasDate && (!endDate || moment(lesson.date).isSameOrBefore(endDate));
          return isInFilteredCourses && laterThanStartDate && earlierThanEndDate;
        })
        .map(lesson => ({ ...lesson, course_short_name: course.short_name }))
    );
  });
  let sorted_lessons = filteredLessons.sort(compareBy(sortLessonsBy));

  if (showWithNoDate) {
    courses.forEach(course => {
      const isInFilteredCourses = courseIdFilters.length == 0 || courseIdFilters.includes(course.id);
      sorted_lessons = [
        ...course.lessons
          .filter(lesson => {
            const hasNoDate = !lesson.date;
            return hasNoDate && isInFilteredCourses;
          })
          .map(lesson => ({ ...lesson, course_short_name: course.short_name })),
        ...sorted_lessons
      ];
    });
  }

  return sorted_lessons;
};
