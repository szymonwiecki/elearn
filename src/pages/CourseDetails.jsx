// src/pages/CourseDetails.jsx

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourses } from '../services/moodleApi';
import Navbar from '../components/Navbar';
import '../styles/CourseDetails.css';
import { useTranslation } from 'react-i18next';

const TOKEN = "90cc2c96e40135f0678108455c344664";
const BASE_URL = "http://localhost/webservice/rest/server.php";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseList = await getCourses();
        const found = courseList.find(c => String(c.id) === id);
        if (found) {
          setCourse(found);

          const res = await fetch(
            `${BASE_URL}?wstoken=${TOKEN}&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=${id}`
          );
          const data = await res.json();
          setSections(data);
        } else {
          setError(t('error.courseNotFound'));
        }
      } catch (err) {
        console.error(t('error.fetching'), err);
        setError(t('error.failedToFetch'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, t]);

  if (loading) return <p style={{ textAlign: 'center' }}>{t('loading.courseDetails')}</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="course-details-wrapper">
        <h1 className="course-details-heading">{course.fullname}</h1>
        <div className="course-section">
          <p><strong>{t('shortName')}:</strong> {course.shortname}</p>
          <p><strong>{t('description')}:</strong></p>
          <div
            className="section-summary"
            dangerouslySetInnerHTML={{ __html: course.summary || t('noDescription') }}
          />
          <p><strong>ID:</strong> {course.id}</p>
        </div>

        {sections.length > 0 && sections.map((section) => (
          <div key={section.id} className="course-section">
            <h2 className="section-title">{section.name || t('unnamedSection')}</h2>
            {section.summary && (
              <div className="section-summary" dangerouslySetInnerHTML={{ __html: section.summary }} />
            )}
            {section.modules?.length > 0 ? (
              <ul className="module-list">
                {section.modules.map((mod) => (
                  <li key={mod.id} className="module-item">
                    <strong>{mod.name}</strong> ({mod.modname})
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#888', fontStyle: 'italic' }}>{t('noResources')}</p>
            )}
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/courses" className="course-back">&#8592; {t('backToCourses')}</Link>
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
