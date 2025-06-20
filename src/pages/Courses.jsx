import { useEffect, useState } from 'react';
import { getCourses } from '../services/moodleApi';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';
import '../styles/Courses.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';

const TOKEN = "90cc2c96e40135f0678108455c344664";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const slidesToShow = 3;

  useEffect(() => {
    getCourses()
      .then(data => {
        const filtered = data.filter(course => course?.id !== 1 && course?.visible !== 0);
        setCourses(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(t('error.fetchingCourses'), err);
        setLoading(false);
      });
  }, [t]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    centerMode: false,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  if (loading) return <p style={{ textAlign: 'center' }}>{t('loading.courses')}</p>;

  return (
    <>
      <Navbar />
      <div className="courses-wrapper">
        <h1 className="courses-heading">{t('availableCourses')}</h1>
        <Slider {...settings} className="courses-slider">
          {courses.map((course, idx) => {
            const file = course.overviewfiles?.[0];
            const imageUrl = file?.mimetype?.startsWith("image/")
              ? `${file.fileurl.replace("/webservice", "")}?token=${TOKEN}`
              : null;

            const middleIndex = (activeSlide + Math.floor(slidesToShow / 2)) % courses.length;
            const isMiddle = idx === middleIndex;

            return (
              <div key={course.id} className={`course-slide ${isMiddle ? 'active-slide' : ''}`}>
                <div className="course-card">
                  {imageUrl ? (
                    <img src={imageUrl} alt="" className="course-image" />
                  ) : (
                    <div className="course-placeholder">{t('noThumbnail')}</div>
                  )}
                  <div className="course-title">{course.fullname}</div>
                  <div
                    className="course-desc"
                    dangerouslySetInnerHTML={{ __html: course.summary || t('noDescription') }}
                  />
                  <Link to={`/courses/${course.id}`} className="course-button">{t('seeMore')}</Link>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default Courses;